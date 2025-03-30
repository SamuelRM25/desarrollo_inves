<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "privacy_survey";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['submit_survey'])) {
    // Get form data from POST
    $data = json_decode($_POST['survey_data'], true);
    
    // Insert respondent data
    $stmt = $conn->prepare("INSERT INTO respondents (age, gender, education_level, occupation, social_media_usage) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issss", $data['demographics']['age'], $data['demographics']['gender'], $data['demographics']['education'], $data['demographics']['occupation'], $data['demographics']['socialMediaUsage']);
    
    if ($stmt->execute()) {
        $respondent_id = $conn->insert_id;
        
        // Insert survey responses
        $stmt = $conn->prepare("INSERT INTO survey_responses (respondent_id, question_id, response) VALUES (?, ?, ?)");
        
        foreach ($data['responses'] as $question_id => $response) {
            // If response is an array (checkbox), convert to comma-separated string
            if (is_array($response)) {
                $response = implode(", ", $response);
            }
            
            $stmt->bind_param("iis", $respondent_id, $question_id, $response);
            $stmt->execute();
        }
        
        $submission_success = true;
    } else {
        $submission_error = "Error al guardar los datos: " . $stmt->error;
    }
    
    $stmt->close();
}

// Get questions from database
$questions_json = "[]";
$sql = "SELECT * FROM questions ORDER BY id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $questions = array();
    while($row = $result->fetch_assoc()) {
        $questions[] = $row;
    }
    $questions_json = json_encode($questions);
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evaluación de Privacidad en Redes Sociales</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">
                <i class="fas fa-shield-alt"></i>
                <h1>PrivacyPulse</h1>
            </div>
            <h2>Evaluación de la Privacidad y Protección de Datos en Redes Sociales</h2>
            <p class="subtitle">Estudio en la población de 18 a 60 años de la Ciudad de Guatemala</p>
        </header>

        <div class="progress-container">
            <div class="progress-bar">
                <div class="progress" id="progress-bar"></div>
            </div>
            <div class="progress-text">Progreso: <span id="progress-percentage">0%</span></div>
        </div>

        <main>
            <?php if (isset($submission_success) && $submission_success): ?>
            <section id="thank-you" class="active-section">
                <div class="thank-you-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>¡Gracias por completar la encuesta!</h3>
                    <p>Sus respuestas han sido registradas correctamente. Su participación es invaluable para nuestra investigación sobre privacidad y protección de datos en redes sociales.</p>
                    <p>Los resultados de este estudio contribuirán a comprender mejor las actitudes y prácticas de los guatemaltecos respecto a la privacidad digital, y podrían informar futuras políticas y recomendaciones.</p>
                    <a href="index.php" class="btn">Realizar otra encuesta</a>
                </div>
            </section>
            <?php else: ?>
            <section id="introduction" class="active-section">
                <h3>Bienvenido a nuestro estudio</h3>
                <p>Gracias por participar en esta investigación sobre privacidad y protección de datos en redes sociales. Sus respuestas nos ayudarán a comprender mejor las actitudes y prácticas de los guatemaltecos respecto a la privacidad digital.</p>
                <p>La encuesta tomará aproximadamente 10 minutos. Todas las respuestas son anónimas y serán utilizadas únicamente con fines de investigación.</p>
                
                <div class="demographics-form">
                    <h4>Información Demográfica</h4>
                    
                    <div class="form-group">
                        <label for="age">Edad:</label>
                        <input type="number" id="age" name="age" min="18" max="60" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="gender">Género:</label>
                        <select id="gender" name="gender" required>
                            <option value="">Seleccione una opción</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="No binario">No binario</option>
                            <option value="Prefiero no decir">Prefiero no decir</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="education">Nivel educativo:</label>
                        <select id="education" name="education" required>
                            <option value="">Seleccione una opción</option>
                            <option value="Primaria">Primaria</option>
                            <option value="Secundaria">Secundaria</option>
                            <option value="Diversificado">Diversificado</option>
                            <option value="Universidad incompleta">Universidad incompleta</option>
                            <option value="Universidad completa">Universidad completa</option>
                            <option value="Postgrado">Postgrado</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="occupation">Ocupación:</label>
                        <input type="text" id="occupation" name="occupation" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="socialMediaUsage">Uso de redes sociales:</label>
                        <select id="socialMediaUsage" name="socialMediaUsage" required>
                            <option value="">Seleccione una opción</option>
                            <option value="Menos de 1 hora al día">Menos de 1 hora al día</option>
                            <option value="1-2 horas al día">1-2 horas al día</option>
                            <option value="3-5 horas al día">3-5 horas al día</option>
                            <option value="Más de 5 horas al día">Más de 5 horas al día</option>
                        </select>
                    </div>
                </div>
                
                <button id="start-survey" class="btn">Comenzar Encuesta</button>
            </section>

            <section id="survey-container" class="hidden">
                <!-- Questions will be loaded here dynamically -->
            </section>

            <section id="thank-you" class="hidden">
                <div class="thank-you-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>¡Gracias por completar la encuesta!</h3>
                    <p>Sus respuestas han sido registradas correctamente. Su participación es invaluable para nuestra investigación sobre privacidad y protección de datos en redes sociales.</p>
                    <p>Los resultados de este estudio contribuirán a comprender mejor las actitudes y prácticas de los guatemaltecos respecto a la privacidad digital, y podrían informar futuras políticas y recomendaciones.</p>
                    <button id="restart-survey" class="btn">Realizar otra encuesta</button>
                </div>
            </section>
            
            <!-- Hidden form for PHP submission -->
            <form id="survey-form" method="POST" action="" style="display: none;">
                <input type="hidden" name="survey_data" id="survey-data">
                <input type="hidden" name="submit_survey" value="1">
            </form>
            <?php endif; ?>
        </main>

        <footer>
            <p>&copy; 2023 PrivacyPulse | Estudio de Privacidad en Redes Sociales</p>
            <p>Universidad de Guatemala - Facultad de Ciencias Sociales</p>
        </footer>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Elements
        const introSection = document.getElementById('introduction');
        const surveyContainer = document.getElementById('survey-container');
        const thankYouSection = document.getElementById('thank-you');
        const startSurveyBtn = document.getElementById('start-survey');
        const restartSurveyBtn = document.getElementById('restart-survey');
        const progressBar = document.getElementById('progress-bar');
        const progressPercentage = document.getElementById('progress-percentage');
        const surveyForm = document.getElementById('survey-form');
        const surveyDataInput = document.getElementById('survey-data');
        
        // Variables
        let questions = <?php echo $questions_json ?: '[]'; ?>;
        let currentQuestionIndex = 0;
        let responses = {};
        
        // If no questions in database, use hardcoded ones
        if (questions.length === 0) {
            questions = [
                {id: 1, question_text: '¿Con qué frecuencia revisa y actualiza la configuración de privacidad en sus redes sociales?', question_type: 'select', options: 'Nunca,Raramente,Ocasionalmente,Frecuentemente,Muy frecuentemente'},
                {id: 2, question_text: '¿Qué nivel de preocupación tiene respecto a cómo las redes sociales utilizan sus datos personales?', question_type: 'select', options: 'Ninguna preocupación,Poca preocupación,Moderada preocupación,Alta preocupación,Extrema preocupación'},
                {id: 3, question_text: '¿Ha experimentado alguna violación de privacidad en redes sociales en los últimos 12 meses?', question_type: 'select', options: 'Sí,No,No estoy seguro/a'},
                {id: 4, question_text: '¿Qué tipo de información personal considera más sensible para compartir en redes sociales?', question_type: 'select', options: 'Información financiera,Ubicación en tiempo real,Datos médicos,Información familiar,Opiniones políticas,Creencias religiosas,Fotografías personales'},
                {id: 5, question_text: '¿Lee los términos y condiciones antes de aceptarlos en aplicaciones o redes sociales?', question_type: 'select', options: 'Nunca,Raramente,A veces,Frecuentemente,Siempre'},
                {id: 6, question_text: '¿Utiliza métodos de autenticación de dos factores en sus cuentas de redes sociales?', question_type: 'select', options: 'En ninguna cuenta,En algunas cuentas,En la mayoría de cuentas,En todas mis cuentas,No sé qué es la autenticación de dos factores'},
                {id: 7, question_text: '¿Qué medidas toma para proteger su privacidad en línea?', question_type: 'checkbox', options: 'Uso contraseñas complejas,Cambio mis contraseñas regularmente,Limito la información que comparto,Uso VPN,Reviso regularmente la configuración de privacidad,Uso navegación privada,No tomo ninguna medida específica'},
                {id: 8, question_text: '¿Cómo calificaría su conocimiento sobre las leyes de protección de datos en Guatemala?', question_type: 'select', options: 'Muy bajo,Bajo,Moderado,Alto,Muy alto'},
                {id: 9, question_text: '¿Ha recibido alguna vez formación o educación sobre privacidad digital?', question_type: 'select', options: 'Nunca,Informal (artículos/videos),Curso básico,Formación avanzada,Formación profesional'},
                {id: 10, question_text: '¿Considera que las empresas de redes sociales son transparentes sobre cómo utilizan sus datos?', question_type: 'select', options: 'Nada transparentes,Poco transparentes,Moderadamente transparentes,Bastante transparentes,Completamente transparentes'},
                {id: 11, question_text: '¿Ha eliminado alguna vez una cuenta de red social debido a preocupaciones de privacidad?', question_type: 'select', options: 'Sí,No,Lo he considerado pero no lo he hecho'},
                {id: 12, question_text: '¿Qué tan cómodo se siente con la publicidad personalizada basada en su comportamiento en línea?', question_type: 'select', options: 'Muy incómodo,Algo incómodo,Neutral,Algo cómodo,Muy cómodo'},
                {id: 13, question_text: '¿Cree que tiene control sobre quién puede ver su contenido en redes sociales?', question_type: 'select', options: 'Ningún control,Poco control,Control moderado,Bastante control,Control total'},
                {id: 14, question_text: '¿Ha experimentado consecuencias negativas debido a información compartida en redes sociales?', question_type: 'select', options: 'Nunca,Raramente,Ocasionalmente,Frecuentemente,Muy frecuentemente'},
                {id: 15, question_text: '¿Qué tan importante considera la privacidad digital en comparación con hace 5 años?', question_type: 'select', options: 'Mucho menos importante,Algo menos importante,Igual de importante,Algo más importante,Mucho más importante'},
                {id: 16, question_text: '¿Confía en que las redes sociales protegen adecuadamente sus datos personales?', question_type: 'select', options: 'No confío en absoluto,Confío poco,Confío moderadamente,Confío bastante,Confío plenamente'},
                {id: 17, question_text: '¿Qué aspectos de la recopilación de datos le preocupan más?', question_type: 'checkbox', options: 'Seguimiento de ubicación,Reconocimiento facial,Escucha de conversaciones,Historial de navegación,Análisis de mensajes privados,Venta de datos a terceros,Creación de perfiles psicológicos'},
                {id: 18, question_text: '¿Cómo reacciona cuando una aplicación solicita acceso a su cámara, micrófono o ubicación?', question_type: 'select', options: 'Siempre acepto,Generalmente acepto,Evalúo caso por caso,Generalmente rechazo,Siempre rechazo'},
                {id: 19, question_text: '¿Considera que debería existir una regulación más estricta sobre la privacidad en redes sociales?', question_type: 'select', options: 'No es necesaria,Ligeramente más estricta,Moderadamente más estricta,Significativamente más estricta,Completamente reformada'},
                {id: 20, question_text: '¿Qué tan dispuesto estaría a pagar por una red social que garantice total privacidad y no venda sus datos?', question_type: 'select', options: 'Nada dispuesto,Poco dispuesto,Moderadamente dispuesto,Bastante dispuesto,Completamente dispuesto'}
            ];
        }
        
        // Event listeners
        if (startSurveyBtn) {
            startSurveyBtn.addEventListener('click', startSurvey);
        }
        if (restartSurveyBtn) {
            restartSurveyBtn.addEventListener('click', restartSurvey);
        }
        
        // Functions
        function startSurvey() {
            // Validate demographics form
            const age = document.getElementById('age').value;
            const gender = document.getElementById('gender').value;
            const education = document.getElementById('education').value;
            const occupation = document.getElementById('occupation').value;
            const socialMediaUsage = document.getElementById('socialMediaUsage').value;
            
            // Simple validation
            if (!age || !gender || !education || !occupation || !socialMediaUsage) {
                alert('Por favor complete todos los campos demográficos antes de continuar.');
                return;
            }
            
            if (age < 18 || age > 60) {
                alert('La edad debe estar entre 18 y 60 años para participar en este estudio.');
                return;
            }
            
            // Hide introduction, show survey
            introSection.classList.remove('active-section');
            introSection.classList.add('hidden');
            surveyContainer.classList.remove('hidden');
            surveyContainer.classList.add('active-section');
            
            // Display the first question
            displayQuestion(currentQuestionIndex);
            updateProgressBar();
        }
        
        function displayQuestion(index) {
            const question = questions[index];
            surveyContainer.innerHTML = '';
            
            const questionContainer = document.createElement('div');
            questionContainer.className = 'question-container';
            
            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.textContent = `${index + 1}. ${question.question_text}`;
            
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';
            
            // Parse options
            const options = question.options.split(',');
            
            if (question.question_type === 'select') {
                options.forEach((option, optionIndex) => {
                    const optionDiv = document.createElement('div');
                    optionDiv.className = 'option';
                    
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = `question_${question.id}`;
                    input.id = `option_${question.id}_${optionIndex}`;
                    input.value = option;
                    
                    // Check if this option was previously selected
                    if (responses[question.id] === option) {
                        input.checked = true;
                    }
                    
                    const label = document.createElement('label');
                    label.htmlFor = `option_${question.id}_${optionIndex}`;
                    label.textContent = option;
                    
                    optionDiv.appendChild(input);
                    optionDiv.appendChild(label);
                    optionsContainer.appendChild(optionDiv);
                });
            } else if (question.question_type === 'checkbox') {
                options.forEach((option, optionIndex) => {
                    const optionDiv = document.createElement('div');
                    optionDiv.className = 'option';
                    
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.name = `question_${question.id}`;
                    input.id = `option_${question.id}_${optionIndex}`;
                    input.value = option;
                    
                    // Check if this option was previously selected
                    if (responses[question.id] && responses[question.id].includes(option)) {
                        input.checked = true;
                    }
                    
                    const label = document.createElement('label');
                    label.htmlFor = `option_${question.id}_${optionIndex}`;
                    label.textContent = option;
                    
                    optionDiv.appendChild(input);
                    optionDiv.appendChild(label);
                    optionsContainer.appendChild(optionDiv);
                });
            }
            
            questionContainer.appendChild(questionText);
            questionContainer.appendChild(optionsContainer);
            
            // Navigation buttons
            const navigationButtons = document.createElement('div');
            navigationButtons.className = 'navigation-buttons';
            
            if (index > 0) {
                const prevButton = document.createElement('button');
                prevButton.className = 'btn';
                prevButton.textContent = 'Anterior';
                prevButton.addEventListener('click', () => {
                    saveResponses();
                    currentQuestionIndex--;
                    displayQuestion(currentQuestionIndex);
                    updateProgressBar();
                });
                navigationButtons.appendChild(prevButton);
            }
            
            const nextButton = document.createElement('button');
            nextButton.className = 'btn';
            
            if (index === questions.length - 1) {
                nextButton.textContent = 'Finalizar';
                nextButton.addEventListener('click', () => {
                    if (validateQuestion()) {
                        saveResponses();
                        submitSurvey();
                    }
                });
            } else {
                nextButton.textContent = 'Siguiente';
                nextButton.addEventListener('click', () => {
                    if (validateQuestion()) {
                        saveResponses();
                        currentQuestionIndex++;
                        displayQuestion(currentQuestionIndex);
                        updateProgressBar();
                    }
                });
            }
            
            navigationButtons.appendChild(nextButton);
            questionContainer.appendChild(navigationButtons);
            
            surveyContainer.appendChild(questionContainer);
        }
        
        function validateQuestion() {
            const question = questions[currentQuestionIndex];
            
            if (question.question_type === 'select') {
                const selectedOption = document.querySelector(`input[name="question_${question.id}"]:checked`);
                if (!selectedOption) {
                    alert('Por favor seleccione una opción para continuar.');
                    return false;
                }
            } else if (question.question_type === 'checkbox') {
                const selectedOptions = document.querySelectorAll(`input[name="question_${question.id}"]:checked`);
                if (selectedOptions.length === 0) {
                    alert('Por favor seleccione al menos una opción para continuar.');
                    return false;
                }
            }
            
            return true;
        }
        
        function saveResponses() {
            const question = questions[currentQuestionIndex];
            
            if (question.question_type === 'select') {
                const selectedOption = document.querySelector(`input[name="question_${question.id}"]:checked`);
                if (selectedOption) {
                    responses[question.id] = selectedOption.value;
                }
            } else if (question.question_type === 'checkbox') {
                const selectedOptions = document.querySelectorAll(`input[name="question_${question.id}"]:checked`);
                if (selectedOptions.length > 0) {
                    responses[question.id] = Array.from(selectedOptions).map(option => option.value);
                }
            }
        }
        
        function updateProgressBar() {
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            progressBar.style.width = `${progress}%`;
            progressPercentage.textContent = `${Math.round(progress)}%`;
        }
        
        function submitSurvey() {
            // Get demographic data
            const demographicData = {
                age: document.getElementById('age').value,
                gender: document.getElementById('gender').value,
                education: document.getElementById('education').value,
                occupation: document.getElementById('occupation').value,
                socialMediaUsage: document.getElementById('socialMediaUsage').value
            };
            
            // Prepare data for submission
            const surveyData = {
                demographics: demographicData,
                responses: responses
            };
            
            // Set the data in the hidden form and submit
            surveyDataInput.value = JSON.stringify(surveyData);
            surveyForm.submit();
        }
        
        function showThankYouPage() {
            surveyContainer.classList.remove('active-section');
            surveyContainer.classList.add('hidden');
            thankYouSection.classList.remove('hidden');
            thankYouSection.classList.add('active-section');
        }
        
        function restartSurvey() {
            // Reset variables
            currentQuestionIndex = 0;
            responses = {};
            
            // Reset UI
            thankYouSection.classList.remove('active-section');
            thankYouSection.classList.add('hidden');
            introSection.classList.remove('hidden');
            introSection.classList.add('active-section');
            
            // Reset form fields
            document.getElementById('age').value = '';
            document.getElementById('gender').value = '';
            document.getElementById('education').value = '';
            document.getElementById('occupation').value = '';
            document.getElementById('socialMediaUsage').value = '';
            
            // Reset progress bar
            progressBar.style.width = '0%';
            progressPercentage.textContent = '0%';
        }
    });
    </script>
</body>
</html>