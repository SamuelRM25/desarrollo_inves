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
  host: process.env.DB_HOST || 'bws0yasujq031i24yg3o-mysql.services.clever-cloud.com',
  user: process.env.DB_USER || 'uggmkntt2edpjhf3',
  password: process.env.DB_PASSWORD || 'FZ4mbt4RcccRWKEdtzQH',
  database: process.env.DB_NAME || 'bws0yasujq031i24yg3o'
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

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
