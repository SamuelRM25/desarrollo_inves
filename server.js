const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'privacy_survey'
};

// Create database connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testConnection();

// API Routes
// Get all questions
app.get('/api/questions', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM questions ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Error fetching questions' });
  }
});

// Submit survey
app.post('/api/submit-survey', async (req, res) => {
  const data = req.body;
  
  try {
    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // Insert respondent data
      const [respondentResult] = await connection.execute(
        'INSERT INTO respondents (age, gender, education_level, occupation, social_media_usage) VALUES (?, ?, ?, ?, ?)',
        [
          data.demographics.age,
          data.demographics.gender,
          data.demographics.education,
          data.demographics.occupation,
          data.demographics.socialMediaUsage
        ]
      );
      
      const respondentId = respondentResult.insertId;
      
      // Insert survey responses
      for (const [questionId, response] of Object.entries(data.responses)) {
        let responseValue = response;
        
        // If response is an array (checkbox), convert to comma-separated string
        if (Array.isArray(response)) {
          responseValue = response.join(', ');
        }
        
        await connection.execute(
          'INSERT INTO survey_responses (respondent_id, question_id, response) VALUES (?, ?, ?)',
          [respondentId, questionId, responseValue]
        );
      }
      
      // Commit transaction
      await connection.commit();
      connection.release();
      
      res.json({ success: true });
    } catch (error) {
      // Rollback transaction on error
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Error submitting survey:', error);
    res.status(500).json({ error: 'Error submitting survey' });
  }
});

// Big Data Analytics API - Real Data
app.get('/api/analytics', async (req, res) => {
  try {
    // Verificar conexión a la base de datos
    try {
      const connection = await pool.getConnection();
      console.log('Database connection successful for analytics endpoint');
      connection.release();
    } catch (connError) {
      console.error('Database connection failed for analytics endpoint:', connError);
      return res.status(500).json({ 
        error: 'Database connection failed', 
        details: connError.message,
        fallback: 'Using mock data due to database connection failure'
      });
    }
    
    // Get total respondents
    try {
      const [totalResult] = await pool.query('SELECT COUNT(*) as total FROM respondents');
      const totalRespondents = totalResult[0].total;
      
      // If no data, return mock data
      if (totalRespondents === 0) {
        console.log('No real data found, returning mock data');
        return res.json(getMockAnalyticsData());
      }
      
      // Get last update time
      const [lastUpdateResult] = await pool.query('SELECT MAX(created_at) as last_update FROM respondents');
      const lastUpdate = lastUpdateResult[0].last_update;
      
      // Get demographics data
      const [ageResult] = await pool.query(`
        SELECT 
          CASE 
            WHEN age BETWEEN 18 AND 25 THEN '18-25'
            WHEN age BETWEEN 26 AND 35 THEN '26-35'
            WHEN age BETWEEN 36 AND 45 THEN '36-45'
            WHEN age BETWEEN 46 AND 60 THEN '46-60'
          END as age_group,
          COUNT(*) as count
        FROM respondents
        GROUP BY age_group
        ORDER BY age_group
      `);
      
      const ageDistribution = {};
      ageResult.forEach(row => {
        ageDistribution[row.age_group] = row.count;
      });
      
      // Get gender distribution
      const [genderResult] = await pool.query(`
        SELECT gender, COUNT(*) as count
        FROM respondents
        GROUP BY gender
      `);
      
      const genderDistribution = {};
      genderResult.forEach(row => {
        genderDistribution[row.gender] = row.count;
      });
      
      // Get education distribution
      const [educationResult] = await pool.query(`
        SELECT education_level, COUNT(*) as count
        FROM respondents
        GROUP BY education_level
      `);
      
      const educationDistribution = {};
      educationResult.forEach(row => {
        educationDistribution[row.education_level] = row.count;
      });
      
      // Get social media usage
      const [socialMediaResult] = await pool.query(`
        SELECT social_media_usage, COUNT(*) as count
        FROM respondents
        GROUP BY social_media_usage
      `);
      
      const socialMediaUsage = {};
      socialMediaResult.forEach(row => {
        socialMediaUsage[row.social_media_usage] = row.count;
      });
      
      // Get privacy settings review (Question 1)
      const [privacySettingsResult] = await pool.query(`
        SELECT sr.response, COUNT(*) as count
        FROM survey_responses sr
        WHERE sr.question_id = 1
        GROUP BY sr.response
      `);
      
      const privacySettingsReview = {};
      privacySettingsResult.forEach(row => {
        privacySettingsReview[row.response] = row.count;
      });
      
      // Get data concern level (Question 2)
      const [dataConcernResult] = await pool.query(`
        SELECT sr.response, COUNT(*) as count
        FROM survey_responses sr
        WHERE sr.question_id = 2
        GROUP BY sr.response
      `);
      
      const dataConcern = {};
      dataConcernResult.forEach(row => {
        dataConcern[row.response] = row.count;
      });
      
      // Calculate average concern level
      let concernSum = 0;
      let concernCount = 0;
      const concernLevels = {
        'Ninguna preocupación': 1,
        'Poca preocupación': 2,
        'Moderada preocupación': 3,
        'Alta preocupación': 4,
        'Extrema preocupación': 5
      };
      
      Object.entries(dataConcern).forEach(([response, count]) => {
        if (concernLevels[response]) {
          concernSum += concernLevels[response] * count;
          concernCount += count;
        }
      });
      
      const averageConcern = concernCount > 0 ? concernSum / concernCount : 0;
      
      // Get privacy violations (Question 3)
      const [privacyViolationsResult] = await pool.query(`
        SELECT sr.response, COUNT(*) as count
        FROM survey_responses sr
        WHERE sr.question_id = 3
        GROUP BY sr.response
      `);
      
      const privacyViolations = {};
      privacyViolationsResult.forEach(row => {
        privacyViolations[row.response] = row.count;
      });
      
      // Get terms reading (Question 5)
      const [termsReadingResult] = await pool.query(`
        SELECT sr.response, COUNT(*) as count
        FROM survey_responses sr
        WHERE sr.question_id = 5
        GROUP BY sr.response
      `);
      
      const termsReading = {};
      termsReadingResult.forEach(row => {
        termsReading[row.response] = row.count;
      });
      
      // Get two-factor auth usage (Question 6)
      const [twoFactorResult] = await pool.query(`
        SELECT sr.response, COUNT(*) as count
        FROM survey_responses sr
        WHERE sr.question_id = 6
        GROUP BY sr.response
      `);
      
      const twoFactorAuth = {};
      twoFactorResult.forEach(row => {
        twoFactorAuth[row.response] = row.count;
      });
      
      // Get protection measures (Question 7)
      const [protectionMeasuresResult] = await pool.query(`
        SELECT sr.response
        FROM survey_responses sr
        WHERE sr.question_id = 7
      `);
      
      const protectionMeasures = {};
      protectionMeasuresResult.forEach(row => {
        const measures = row.response.split(', ');
        measures.forEach(measure => {
          protectionMeasures[measure] = (protectionMeasures[measure] || 0) + 1;
        });
      });
      
      // Calculate security measures usage percentage
      const securityMeasuresCount = Object.values(protectionMeasures).reduce((sum, count) => sum + count, 0);
      const securityMeasuresUsage = (securityMeasuresCount / totalRespondents) * 100 / 6; // Divide by 6 possible measures
      
      // Get permissions reaction (Question 18)
      const [permissionsResult] = await pool.query(`
        SELECT sr.response, COUNT(*) as count
        FROM survey_responses sr
        WHERE sr.question_id = 18
        GROUP BY sr.response
      `);
      
      const permissionsReaction = {};
      permissionsResult.forEach(row => {
        permissionsReaction[row.response] = row.count;
      });
      
      // Get account deletion (Question 11)
      const [accountDeletionResult] = await pool.query(`
        SELECT sr.response, COUNT(*) as count
        FROM survey_responses sr
        WHERE sr.question_id = 11
        GROUP BY sr.response
      `);
      
      const accountDeletion = {};
      accountDeletionResult.forEach(row => {
        accountDeletion[row.response] = row.count;
      });
      
      // Get sensitive info (Question 4)
      const [sensitiveInfoResult] = await pool.query(`
        SELECT sr.response, COUNT(*) as count
        FROM survey_responses sr
        WHERE sr.question_id = 4
        GROUP BY sr.response
      `);
      
      const sensitiveInfo = {};
      sensitiveInfoResult.forEach(row => {
        sensitiveInfo[row.response] = row.count;
      });
      
      // Get data collection concerns (Question 17)
      const [dataCollectionResult] = await pool.query(`
        SELECT sr.response
        FROM survey_responses sr
        WHERE sr.question_id = 17
      `);
      
      const dataCollectionConcerns = {};
      dataCollectionResult.forEach(row => {
        const concerns = row.response.split(', ');
        concerns.forEach(concern => {
          dataCollectionConcerns[concern] = (dataCollectionConcerns[concern] || 0) + 1;
        });
      });
      
      // Get transparency perception (Question 10)
      const [transparencyResult] = await pool.query(`
        SELECT sr.response, COUNT(*) as count
        FROM survey_responses sr
        WHERE sr.question_id = 10
        GROUP BY sr.response
      `);
      
      const transparency = {};
      transparencyResult.forEach(row => {
        transparency[row.response] = row.count;
      });
      
      // Get pay for privacy willingness (Question 20)
      const [payForPrivacyResult] = await pool.query(`
        SELECT sr.response, COUNT(*) as count
        FROM survey_responses sr
        WHERE sr.question_id = 20
        GROUP BY sr.response
      `);
      
      const payForPrivacy = {};
      payForPrivacyResult.forEach(row => {
        payForPrivacy[row.response] = row.count;
      });
      
      // Compile all data
      const analyticsData = {
        totalRespondents,
        lastUpdate,
        averageConcern,
        securityMeasuresUsage,
        demographics: {
          ageDistribution,
          genderDistribution,
          educationDistribution,
          socialMediaUsage
        },
        privacy: {
          privacySettingsReview,
          dataConcern,
          privacyViolations,
          termsReading
        },
        behavior: {
          twoFactorAuth,
          protectionMeasures,
          permissionsReaction,
          accountDeletion
        },
        concerns: {
          sensitiveInfo,
          dataCollectionConcerns,
          transparency,
          payForPrivacy
        }
      };
      
      res.json(analyticsData);
    } catch (queryError) {
      console.error('Error in database query:', queryError);
      // Proporcionar información detallada sobre el error y usar datos de respaldo
      console.log('Using mock data as fallback due to query error');
      return res.json({
        source: 'mock_data_fallback',
        error_details: queryError.message,
        ...getMockAnalyticsData()
      });
    }
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    // Proporcionar información detallada sobre el error
    res.status(500).json({ 
      error: 'Error fetching analytics data', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Añadir un endpoint de diagnóstico para verificar la conexión a la base de datos
app.get('/api/diagnostics', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [tables] = await connection.query('SHOW TABLES');
    const [respondentsCount] = await connection.query('SELECT COUNT(*) as count FROM respondents');
    const [responsesCount] = await connection.query('SELECT COUNT(*) as count FROM survey_responses');
    
    connection.release();
    
    res.json({
      status: 'ok',
      database_connected: true,
      tables: tables.map(t => Object.values(t)[0]),
      counts: {
        respondents: respondentsCount[0].count,
        responses: responsesCount[0].count
      },
      environment: {
        node_env: process.env.NODE_ENV || 'not set',
        db_host: process.env.DB_HOST ? 'set' : 'not set',
        db_name: process.env.DB_NAME || dbConfig.database
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database_connected: false,
      error: error.message,
      config: {
        host: dbConfig.host,
        database: dbConfig.database,
        user: dbConfig.user ? 'set' : 'not set',
        password: dbConfig.password ? 'set' : 'not set'
      }
    });
  }
});

// Mock Data API - Always returns test data
app.get('/api/mock-analytics', (req, res) => {
  console.log('Serving mock analytics data');
  res.json(getMockAnalyticsData());
});

// Function to generate mock analytics data
function getMockAnalyticsData() {
  return {
    totalRespondents: 157,
    lastUpdate: new Date().toISOString(),
    averageConcern: 3.8,
    securityMeasuresUsage: 42.5,
    demographics: {
      ageDistribution: {
        '18-25': 45,
        '26-35': 62,
        '36-45': 32,
        '46-60': 18
      },
      genderDistribution: {
        'Masculino': 83,
        'Femenino': 74
      },
      educationDistribution: {
        'Primaria': 5,
        'Secundaria': 12,
        'Diversificado': 38,
        'Universidad incompleta': 42,
        'Universidad completa': 48,
        'Postgrado': 12
      },
      socialMediaUsage: {
        'Menos de 1 hora al día': 15,
        '1-2 horas al día': 42,
        '3-5 horas al día': 68,
        'Más de 5 horas al día': 32
      }
    },
    privacy: {
      privacySettingsReview: {
        'Nunca': 28,
        'Raramente': 45,
        'Ocasionalmente': 52,
        'Frecuentemente': 24,
        'Muy frecuentemente': 8
      },
      dataConcern: {
        'Ninguna preocupación': 5,
        'Poca preocupación': 18,
        'Moderada preocupación': 42,
        'Alta preocupación': 65,
        'Extrema preocupación': 27
      },
      privacyViolations: {
        'Sí': 38,
        'No': 92,
        'No estoy seguro/a': 27
      },
      termsReading: {
        'Nunca': 68,
        'Raramente': 45,
        'A veces': 32,
        'Frecuentemente': 8,
        'Siempre': 4
      }
    },
    behavior: {
      twoFactorAuth: {
        'En ninguna cuenta': 52,
        'En algunas cuentas': 65,
        'En la mayoría de cuentas': 25,
        'En todas mis cuentas': 10,
        'No sé qué es la autenticación de dos factores': 5
      },
      protectionMeasures: {
        'Uso contraseñas complejas': 85,
        'Cambio mis contraseñas regularmente': 32,
        'Limito la información que comparto': 95,
        'Uso VPN': 28,
        'Reviso regularmente la configuración de privacidad': 42,
        'Uso navegación privada': 58,
        'No tomo ninguna medida específica': 15
      },
      permissionsReaction: {
        'Siempre acepto': 12,
        'Generalmente acepto': 35,
        'Evalúo caso por caso': 68,
        'Generalmente rechazo': 32,
        'Siempre rechazo': 10
      },
      accountDeletion: {
        'Sí': 42,
        'No': 85,
        'Lo he considerado pero no lo he hecho': 30
      }
    },
    concerns: {
      sensitiveInfo: {
        'Información financiera': 95,
        'Ubicación en tiempo real': 78,
        'Datos médicos': 82,
        'Información familiar': 65,
        'Opiniones políticas': 48,
        'Creencias religiosas': 42,
        'Fotografías personales': 72
      },
      dataCollectionConcerns: {
        'Seguimiento de ubicación': 85,
        'Reconocimiento facial': 72,
        'Escucha de conversaciones': 88,
        'Historial de navegación': 65,
        'Análisis de mensajes privados': 78,
        'Venta de datos a terceros': 92,
        'Creación de perfiles psicológicos': 68
      },
      transparency: {
        'Nada transparentes': 48,
        'Poco transparentes': 65,
        'Moderadamente transparentes': 32,
        'Bastante transparentes': 10,
        'Completamente transparentes': 2
      },
      payForPrivacy: {
        'Nada dispuesto': 35,
        'Poco dispuesto': 42,
        'Moderadamente dispuesto': 48,
        'Bastante dispuesto': 25,
        'Completamente dispuesto': 7
      }
    }
  };
}

// Route for big data dashboard
app.get('/big_data', (req, res) => {
  res.sendFile(path.join(__dirname, 'big_data.html'));
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
  console.log(`Big Data dashboard available at http://localhost:${PORT}/big_data`);
});
