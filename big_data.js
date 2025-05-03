// Script para la página de análisis de datos (big_data.html)

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la navegación
    initNavigation();
    
    // Cargar datos de resumen
    loadSummaryData();
    
    // Cargar datos demográficos
    loadDemographicData();
    
    // Cargar datos de conocimiento y percepción
    loadKnowledgePerceptionData();
    
    // Cargar datos de riesgos y estrategias
    loadRisksStrategiesData();
    
    // Cargar datos del marco normativo
    loadRegulatoryFrameworkData();
    
    // Cargar datos de impacto
    loadImpactData();
    
    // Cargar datos de recomendaciones
    loadRecommendationsData();
    
    // Cargar datos para análisis cruzado
    loadCrossAnalysisData();
});

// Función para inicializar la navegación
function initNavigation() {
    const navLinks = document.querySelectorAll('.dashboard-nav a');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase activa de todos los enlaces
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Añadir clase activa al enlace clickeado
            this.classList.add('active');
            
            // Obtener el ID de la sección a mostrar
            const targetId = this.getAttribute('href');
            
            // Ocultar todas las secciones
            sections.forEach(section => section.style.display = 'none');
            
            // Mostrar la sección seleccionada
            document.querySelector(targetId).style.display = 'block';
        });
    });
    
    // Mostrar la sección de resumen por defecto
    sections.forEach(section => {
        if (section.id !== 'summary-section') {
            section.style.display = 'none';
        }
    });
}

// Función para cargar datos de resumen
function loadSummaryData() {
    // Simulación de datos para demostración
    const totalRespondents = 523;
    const lastUpdate = '15 de mayo de 2025';
    const avgConcern = '4.2/5';
    const securityMeasures = '68%';
    
    // Actualizar elementos en el DOM
    document.getElementById('total-respondents').textContent = totalRespondents;
    document.getElementById('last-update').textContent = lastUpdate;
    document.getElementById('avg-concern').textContent = avgConcern;
    document.getElementById('security-measures').textContent = securityMeasures;
    
    // Hallazgos clave
    const keyFindings = [
        'El 78% de los encuestados expresó alta preocupación por su privacidad en redes sociales',
        'Solo el 32% lee los términos y condiciones antes de aceptarlos',
        'El 45% ha experimentado algún tipo de violación de privacidad en el último año',
        'El 62% desconoce las leyes de protección de datos aplicables en Guatemala'
    ];
    
    const keyFindingsList = document.getElementById('key-findings-list');
    keyFindingsList.innerHTML = '';
    keyFindings.forEach(finding => {
        const li = document.createElement('li');
        li.textContent = finding;
        keyFindingsList.appendChild(li);
    });
}

// Función para cargar datos demográficos
function loadDemographicData() {
    // Gráfico de edad
    const ageCtx = document.getElementById('age-chart').getContext('2d');
    const ageChart = new Chart(ageCtx, {
        type: 'bar',
        data: {
            labels: ['18-25', '26-35', '36-45', '46-60'],
            datasets: [{
                label: 'Distribución por Edad',
                data: [142, 187, 115, 79],
                backgroundColor: [
                    'rgba(74, 111, 165, 0.7)',
                    'rgba(74, 111, 165, 0.7)',
                    'rgba(74, 111, 165, 0.7)',
                    'rgba(74, 111, 165, 0.7)'
                ],
                borderColor: [
                    'rgba(74, 111, 165, 1)',
                    'rgba(74, 111, 165, 1)',
                    'rgba(74, 111, 165, 1)',
                    'rgba(74, 111, 165, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Gráfico de género
    const genderCtx = document.getElementById('gender-chart').getContext('2d');
    const genderChart = new Chart(genderCtx, {
        type: 'pie',
        data: {
            labels: ['Masculino', 'Femenino'],
            datasets: [{
                label: 'Distribución por Género',
                data: [245, 278],
                backgroundColor: [
                    'rgba(22, 96, 136, 0.7)',
                    'rgba(76, 181, 174, 0.7)'
                ],
                borderColor: [
                    'rgba(22, 96, 136, 1)',
                    'rgba(76, 181, 174, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    
    // Gráfico de nivel educativo
    const educationCtx = document.getElementById('education-chart').getContext('2d');
    const educationChart = new Chart(educationCtx, {
        type: 'bar',
        data: {
            labels: ['Primaria', 'Secundaria', 'Universidad', 'Postgrado'],
            datasets: [{
                label: 'Nivel Educativo',
                data: [45, 187, 243, 48],
                backgroundColor: [
                    'rgba(76, 181, 174, 0.7)',
                    'rgba(76, 181, 174, 0.7)',
                    'rgba(76, 181, 174, 0.7)',
                    'rgba(76, 181, 174, 0.7)'
                ],
                borderColor: [
                    'rgba(76, 181, 174, 1)',
                    'rgba(76, 181, 174, 1)',
                    'rgba(76, 181, 174, 1)',
                    'rgba(76, 181, 174, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Gráfico de uso de redes sociales
    const usageCtx = document.getElementById('social-media-usage-chart').getContext('2d');
    const usageChart = new Chart(usageCtx, {
        type: 'bar',
        data: {
            labels: ['Menos de 1 hora', '1-2 horas', '2-4 horas', 'Más de 5 horas'],
            datasets: [{
                label: 'Uso Diario de Redes Sociales',
                data: [67, 145, 198, 113],
                backgroundColor: [
                    'rgba(74, 111, 165, 0.7)',
                    'rgba(74, 111, 165, 0.7)',
                    'rgba(74, 111, 165, 0.7)',
                    'rgba(74, 111, 165, 0.7)'
                ],
                borderColor: [
                    'rgba(74, 111, 165, 1)',
                    'rgba(74, 111, 165, 1)',
                    'rgba(74, 111, 165, 1)',
                    'rgba(74, 111, 165, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Función para cargar datos de conocimiento y percepción
function loadKnowledgePerceptionData() {
    // Gráfico de configuración de privacidad
    const privacySettingsCtx = document.getElementById('privacy-settings-chart').getContext('2d');
    const privacySettingsChart = new Chart(privacySettingsCtx, {
        type: 'pie',
        data: {
            labels: ['Nunca', 'Raramente', 'Ocasionalmente', 'Frecuentemente', 'Muy frecuentemente'],
            datasets: [{
                label: 'Revisión de Configuración de Privacidad',
                data: [87, 156, 143, 98, 39],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(230, 126, 34, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(230, 126, 34, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(52, 152, 219, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    
    // Gráfico de preocupación sobre uso de datos
    const dataConcernCtx = document.getElementById('data-concern-chart').getContext('2d');
    const dataConcernChart = new Chart(dataConcernCtx, {
        type: 'bar',
        data: {
            labels: ['Ninguna', 'Poca', 'Moderada', 'Alta', 'Extrema'],
            datasets: [{
                label: 'Nivel de Preocupación',
                data: [23, 67, 145, 187, 101],
                backgroundColor: [
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(230, 126, 34, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(155, 89, 182, 0.7)'
                ],
                borderColor: [
                    'rgba(46, 204, 113, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(230, 126, 34, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(155, 89, 182, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Gráfico de lectura de términos y condiciones
    const termsReadingCtx = document.getElementById('terms-reading-chart').getContext('2d');
    const termsReadingChart = new Chart(termsReadingCtx, {
        type: 'pie',
        data: {
            labels: ['Nunca', 'Raramente', 'A veces', 'Frecuentemente', 'Siempre'],
            datasets: [{
                label: 'Lectura de Términos y Condiciones',
                data: [187, 156, 98, 56, 26],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(230, 126, 34, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(230, 126, 34, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(52, 152, 219, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    
    // Gráfico de transparencia
    const transparencyCtx = document.getElementById('transparency-chart').getContext('2d');
    const transparencyChart = new Chart(transparencyCtx, {
        type: 'bar',
        data: {
            labels: ['Nada transparentes', 'Poco transparentes', 'Moderadamente', 'Bastante', 'Completamente'],
            datasets: [{
                label: 'Percepción de Transparencia',
                data: [156, 187, 123, 45, 12],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(230, 126, 34, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(230, 126, 34, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(52, 152, 219, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Gráfico de conocimiento de derechos
    const rightsKnowledgeCtx = document.getElementById('rights-knowledge-chart').getContext('2d');
    const rightsKnowledgeChart = new Chart(rightsKnowledgeCtx, {
        type: 'bar',
        data: {
            labels: ['Muy bajo', 'Bajo', 'Moderado', 'Alto', 'Muy alto'],
            datasets: [{
                label: 'Conocimiento de Derechos Digitales',
                data: [167, 198, 112, 34, 12],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(230, 126, 34, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(230, 126, 34, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(52, 152, 219, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Actualizar insights
    document.getElementById('knowledge-insights').textContent = 'La mayoría de los encuestados (65%) tiene un conocimiento bajo o muy bajo sobre sus derechos digitales. Además, el 66% considera que las plataformas de redes sociales son poco o nada transparentes sobre el uso de datos personales. Solo el 16% revisa frecuentemente su configuración de privacidad.';
}

// Función para cargar datos de riesgos y estrategias
function loadRisksStrategiesData() {
    // Gráfico de autenticación de dos factores
    const twoFactorCtx = document.getElementById('two-factor-chart').getContext('2d');
    const twoFactorChart = new Chart(twoFactorCtx, {
        type: 'pie',
        data: {
            labels: ['En ninguna cuenta', 'En algunas cuentas', 'En la mayoría', 'En todas', 'No sé qué es'],
            datasets: [{
                label: 'Uso de Autenticación de Dos Factores',
                data: [156, 187, 98, 45, 37],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(230, 126, 34, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(230, 126, 34, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(52, 152, 219, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    
    // Gráfico de medidas de protección
    const protectionMeasuresCtx = document.getElementById('protection-measures-chart').getContext('2d');
    const protectionMeasuresChart = new Chart(protectionMeasuresCtx, {
        type: 'bar',
        data: {
            labels: ['Contraseñas complejas', 'Cambio regular', 'Limitar información', 'Uso de VPN', 'Revisar configuración', 'Navegación privada', 'Ninguna medida'],
            datasets: [{
                label: 'Medidas de Protección Utilizadas',
                data: [312, 187, 356, 123, 245, 198, 67],
                backgroundColor: 'rgba(74, 111, 165, 0.7)',
                borderColor: 'rgba(74, 111, 165, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Gráfico de reacción a permisos
    const permissionsReactionCtx = document.getElementById('permissions-reaction-chart').getContext('2d');
    const permissionsReactionChart = new Chart(permissionsReactionCtx, {
        type: 'pie',
        data: {
            labels: ['Acepto sin leer', 'Reviso superficialmente', 'Evalúo cuidadosamente', 'Rechazo si son excesivos', 'Busco alternativas'],
            datasets: [{
                label: 'Reacción a Solicitudes de Permisos',
                data: [187, 198, 87, 34, 17],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(230, 126, 34, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(230, 126, 34, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(52, 152, 219, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    
    // Gráfico de violaciones de privacidad
    const privacyViolationsCtx = document.getElementById('privacy-violations-chart').getContext('2d');
    const privacyViolationsChart = new Chart(privacyViolationsCtx, {
        type: 'pie',
        data: {
            labels: ['Sí', 'No', 'No estoy seguro/a'],
            datasets: [{
                label: 'Violaciones de Privacidad Experimentadas',
                data: [234, 187, 102],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(241, 196, 15, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(241, 196, 15, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    
    // Gráfico de riesgos percibidos
    const perceivedRisksCtx = document.getElementById('perceived-risks-chart').getContext('2d');
    const perceivedRisksChart = new Chart(perceivedRisksCtx, {
        type: 'bar',
        data: {
            labels: ['Robo de identidad', 'Fraude financiero', 'Acoso', 'Vigilancia', 'Manipulación', 'Discriminación'],
            datasets: [{
                label: 'Riesgos Más Percibidos',
                data: [356, 312, 245, 198, 176, 134],
                backgroundColor: 'rgba(231, 76, 60, 0.7)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Actualizar insights
    document.getElementById('risks-insights').textContent = 'El 45% de los encuestados ha experimentado alguna violación de privacidad. Los riesgos más percibidos son el robo de identidad y el fraude financiero. A pesar de la alta preocupación, solo el 8.6% utiliza autenticación de dos factores en todas sus cuentas y el 73% acepta permisos sin leer detenidamente.';
}

// Función para cargar datos del marco normativo
function loadRegulatoryFrameworkData() {
    // Actualizar textos informativos
    document.getElementById('regulatory-summary').textContent = 'Guatemala carece de una ley específica y comprensiva sobre protección de datos personales en entornos digitales. El Decreto 57-2008 (Ley de Acceso a la Información Pública) contiene algunas disposiciones sobre datos personales, pero se limita principalmente a información en poder de entidades públicas. Esta brecha normativa contrasta con el avance legislativo en otros países de la región.';
    
    document.getElementById('regulatory-challenges').textContent = 'La aplicación de la normativa existente a las redes sociales presenta desafíos significativos: jurisdicción extraterritorial, términos y condiciones transnacionales, y falta de mecanismos efectivos de supervisión. El 62% de los encuestados desconoce sus derechos digitales bajo el marco legal guatemalteco, lo que dificulta aún más la protección efectiva.';
    
    // Inicializar tabla de comparativa
    $(document).ready(function() {
        $('#regulatory-comparison').DataTable({
            responsive: true,
            paging: false,
            info: false
        });
    });
}

// Función para cargar datos de impacto
function loadImpactData() {
    // Actualizar resumen de impacto
    document.getElementById('impact-summary').textContent = 'El 45% de los encuestados reporta haber experimentado algún tipo de consecuencia negativa debido a la exposición de sus datos en redes sociales. Entre los incidentes más comunes se encuentran: publicidad invasiva (78%), mensajes no deseados (56%), intentos de phishing (43%), y suplantación de identidad (12%).';
    
    // Gráfico de información sensible
    const sensitiveInfoCtx = document.getElementById('sensitive-info-chart').getContext('2d');
    const sensitiveInfoChart = new Chart(sensitiveInfoCtx, {
        type: 'bar',
        data: {
            labels: ['Información financiera', 'Ubicación real', 'Datos médicos', 'Info. familiar', 'Opiniones políticas', 'Creencias religiosas', 'Fotos personales'],
            datasets: [{
                label: 'Información Considerada Más Sensible',
                data: [412, 356, 334, 287, 245, 234, 198],
                backgroundColor: 'rgba(231, 76, 60, 0.7)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Gráfico de preocupaciones sobre recopilación
    const dataConcernsCtx = document.getElementById('data-collection-concerns-chart').getContext('2d');
    const dataConcernsChart = new Chart(dataConcernsCtx, {
        type: 'pie',
        data: {
            labels: ['Venta a terceros', 'Publicidad dirigida', 'Vigilancia gubernamental', 'Manipulación de opinión', 'Discriminación algorítmica'],
            datasets: [{
                label: 'Preocupaciones sobre Recopilación de Datos',
                data: [312, 267, 198, 176, 145],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(230, 126, 34, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(230, 126, 34, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(52, 152, 219, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    
    // Gráfico de eliminación de cuentas
    const accountDeletionCtx = document.getElementById('account-deletion-chart').getContext('2d');
    const accountDeletionChart = new Chart(accountDeletionCtx, {
        type: 'pie',
        data: {
            labels: ['Sí', 'No', 'Lo he considerado'],
            datasets: [{
                label: 'Eliminación de Cuentas por Privacidad',
                data: [156, 245, 122],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(241, 196, 15, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(241, 196, 15, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    
    // Gráfico de disposición a pagar
    const payForPrivacyCtx = document.getElementById('pay-for-privacy-chart').getContext('2d');
    const payForPrivacyChart = new Chart(payForPrivacyCtx, {
        type: 'pie',
        data: {
            labels: ['Definitivamente no', 'Probablemente no', 'No estoy seguro', 'Probablemente sí', 'Definitivamente sí'],
            datasets: [{
                label: 'Disposición a Pagar por Privacidad',
                data: [198, 156, 87, 67, 15],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(230, 126, 34, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(230, 126, 34, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(52, 152, 219, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
    
    // Gráfico de incidentes reportados
    const reportedIncidentsCtx = document.getElementById('reported-incidents-chart').getContext('2d');
    const reportedIncidentsChart = new Chart(reportedIncidentsCtx, {
        type: 'bar',
        data: {
            labels: ['Publicidad invasiva', 'Mensajes no deseados', 'Intentos de phishing', 'Suplantación de identidad', 'Acoso', 'Discriminación'],
            datasets: [{
                label: 'Incidentes Reportados',
                data: [408, 293, 225, 63, 47, 32],
                backgroundColor: 'rgba(231, 76, 60, 0.7)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Actualizar insights
    document.getElementById('impact-insights').textContent = 'La publicidad invasiva y los mensajes no deseados son los incidentes más comunes reportados por los usuarios. Sin embargo, los incidentes más graves como suplantación de identidad (12%) y acoso (9%) también están presentes. El 78% de los usuarios considera que la información sobre ubicación y datos financieros son los más sensibles, y el 67% estaría dispuesto a pagar por servicios que garanticen mayor privacidad.';
}

// Función para cargar datos de recomendaciones
function loadRecommendationsData() {
    // Recomendaciones para usuarios
    const userRecommendations = [
        'Revisar y ajustar la configuración de privacidad en todas las plataformas al menos una vez al mes',
        'Utilizar autenticación de dos factores en todas las cuentas posibles',
        'Crear contraseñas únicas y complejas para cada plataforma',
        'Limitar la información personal compartida en perfiles públicos',
        'Verificar la legitimidad de las aplicaciones antes de instalarlas',
        'Revisar periódicamente los permisos otorgados a aplicaciones',
        'Utilizar redes privadas virtuales (VPN) al acceder desde redes públicas'
    ];
    
    // Recomendaciones para plataformas
    const platformRecommendations = [
        'Implementar políticas de privacidad claras y accesibles en lenguaje sencillo',
        'Ofrecer controles de privacidad intuitivos y fáciles de encontrar',
        'Notificar de manera efectiva sobre cambios en políticas de privacidad',
        'Implementar el principio de "privacidad por diseño" en el desarrollo',
        'Proporcionar opciones de exportación y eliminación de datos sencillas',
        'Realizar auditorías de privacidad regulares y transparentes'
    ];
    
    // Recomendaciones para entidades educativas y gubernamentales
    const governmentRecommendations = [
        'Desarrollar un marco legal específico para la protección de datos en entornos digitales',
        'Implementar campañas de concientización sobre privacidad digital',
        'Integrar educación sobre seguridad digital en currículos educativos desde nivel básico',
        'Establecer una autoridad de protección de datos con capacidad sancionadora',
        'Promover la cooperación internacional para abordar desafíos transfronterizos',
        'Ofrecer recursos educativos gratuitos sobre privacidad digital'
    ];
    
    // Actualizar listas en el DOM
    populateList('user-recommendations', userRecommendations);
    populateList('platform-recommendations', platformRecommendations);
    populateList('government-recommendations', governmentRecommendations);
}

// Función para cargar datos de análisis cruzado
function loadCrossAnalysisData() {
    // Crear visualizaciones D3.js para análisis cruzado
    
    // 1. Edad vs Nivel de Preocupación
    createAgeVsConcernHeatmap();
    
    // 2. Nivel Educativo vs Medidas de Seguridad
    createEducationVsMeasuresChart();
    
    // 3. Uso de Redes Sociales vs Violaciones de Privacidad
    createUsageVsViolationsChart();
    
    // Actualizar insights
    document.getElementById('cross-analysis-insights').textContent = 'El análisis cruzado revela patrones significativos: los usuarios entre 26-35 años muestran mayor preocupación por su privacidad, mientras que los mayores de 46 años reportan menos violaciones. Existe una correlación positiva entre el nivel educativo y el uso de medidas de seguridad. Los usuarios con mayor tiempo diario en redes sociales (más de 5 horas) reportan 2.5 veces más violaciones de privacidad que aquellos con uso moderado.';
}

// Función auxiliar para poblar listas
function populateList(elementId, items) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        element.appendChild(li);
    });
}

// Función para crear heatmap de Edad vs Preocupación
function createAgeVsConcernHeatmap() {
    // Datos simulados para el heatmap
    const data = [
        {age: '18-25', concern: 'Ninguna', value: 8},
        {age: '18-25', concern: 'Poca', value: 23},
        {age: '18-25', concern: 'Moderada', value: 45},
        {age: '18-25', concern: 'Alta', value: 42},
        {age: '18-25', concern: 'Extrema', value: 24},
        
        {age: '26-35', concern: 'Ninguna', value: 5},
        {age: '26-35', concern: 'Poca', value: 12},
        {age: '26-35', concern: 'Moderada', value: 38},
        {age: '26-35', concern: 'Alta', value: 87},
        {age: '26-35', concern: 'Extrema', value: 45},
        
        {age: '36-45', concern: 'Ninguna', value: 6},
        {age: '36-45', concern: 'Poca', value: 18},
        {age: '36-45', concern: 'Moderada', value: 42},
        {age: '36-45', concern: 'Alta', value: 35},
        {age: '36-45', concern: 'Extrema', value: 14},
        
        {age: '46-60', concern: 'Ninguna', value: 4},
        {age: '46-60', concern: 'Poca', value: 14},
        {age: '46-60', concern: 'Moderada', value: 20},
        {age: '46-60', concern: 'Alta', value: 23},
        {age: '46-60', concern: 'Extrema', value: 18}
    ];
    
    // Dimensiones y márgenes
    const margin = {top: 30, right: 30, bottom: 70, left: 100},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // Crear el elemento SVG
    const svg = d3.select("#age-vs-concern-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Grupos para ejes X e Y
    const ageGroups = Array.from(new Set(data.map(d => d.age)));
    const concernLevels = ['Ninguna', 'Poca', 'Moderada', 'Alta', 'Extrema'];
    
    // Escalas X e Y
    const x = d3.scaleBand()
        .domain(ageGroups)
        .range([0, width])
        .padding(0.05);
    
    const y = d3.scaleBand()
        .domain(concernLevels)
        .range([height, 0])
        .padding(0.05);
    
    // Añadir ejes
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle");
    
    svg.append("g")
        .call(d3.axisLeft(y));
    
    // Escala de color
    const maxValue = d3.max(data, d => d.value);
    const color = d3.scaleSequential()
        .interpolator(d3.interpolateBlues)
        .domain([0, maxValue]);
    
    // Crear rectángulos para el heatmap
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.age))
        .attr("y", d => y(d.concern))
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", d => color(d.value))
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .on("mouseover", function(event, d) {
            d3.select(this).style("stroke", "black").style("stroke-width", 2);
            
            // Tooltip
            d3.select("#age-vs-concern-chart")
                .append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("background-color", "rgba(0,0,0,0.7)")
                .style("color", "white")
                .style("padding", "5px")
                .style("border-radius", "5px")
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px")
                .html(`Edad: ${d.age}<br>Preocupación: ${d.concern}<br>Cantidad: ${d.value}`);
        })
        .on("mouseout", function() {
            d3.select(this).style("stroke", "white").style("stroke-width", 1);
            d3.selectAll(".tooltip").remove();
        });
    
    // Añadir título
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Relación entre Edad y Nivel de Preocupación");
}

// Función para crear gráfico de Nivel Educativo vs Medidas de Seguridad
function createEducationVsMeasuresChart() {
    // Datos simulados para el gráfico
    const data = [
        {education: 'Primaria', measures: '0 medidas', value: 18},
        {education: 'Primaria', measures: '1-2 medidas', value: 22},
        {education: 'Primaria', measures: '3+ medidas', value: 5},
        
        {education: 'Secundaria', measures: '0 medidas', value: 32},
        {education: 'Secundaria', measures: '1-2 medidas', value: 112},
        {education: 'Secundaria', measures: '3+ medidas', value: 43},
        
        {education: 'Universidad', measures: '0 medidas', value: 15},
        {education: 'Universidad', measures: '1-2 medidas', value: 98},
        {education: 'Universidad', measures: '3+ medidas', value: 130},
        
        {education: 'Postgrado', measures: '0 medidas', value: 2},
        {education: 'Postgrado', measures: '1-2 medidas', value: 16},
        {education: 'Postgrado', measures: '3+ medidas', value: 30}
    ];
    
    // Dimensiones y márgenes
    const margin = {top: 30, right: 150, bottom: 70, left: 80},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // Crear el elemento SVG
    const svg = d3.select("#education-vs-measures-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Grupos para ejes X
    const educationLevels = Array.from(new Set(data.map(d => d.education)));
    const measureGroups = Array.from(new Set(data.map(d => d.measures)));
    
    // Escalas X e Y
    const x = d3.scaleBand()
        .domain(educationLevels)
        .range([0, width])
        .padding(0.2);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) * 1.1])
        .range([height, 0]);
    
    // Escala para subgrupos
    const xSubgroup = d3.scaleBand()
        .domain(measureGroups)
        .range([0, x.bandwidth()])
        .padding(0.05);
    
    // Escala de color
    const color = d3.scaleOrdinal()
        .domain(measureGroups)
        .range(['#e74c3c', '#f39c12', '#2ecc71']);
    
    // Añadir ejes
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle");
    
    svg.append("g")
        .call(d3.axisLeft(y));
    
    // Crear grupos para cada nivel educativo
    const educationGroups = svg.selectAll("g.education")
        .data(educationLevels)
        .enter()
        .append("g")
        .attr("class", "education")
        .attr("transform", d => `translate(${x(d)},0)`);
    
    // Crear barras para cada subgrupo
    educationGroups.selectAll("rect")
        .data(d => {
            return measureGroups.map(measure => {
                const matchingData = data.find(item => item.education === d && item.measures === measure);
                return {
                    education: d,
                    measure: measure,
                    value: matchingData ? matchingData.value : 0
                };
            });
        })
        .enter()
        .append("rect")
        .attr("x", d => xSubgroup(d.measure))
        .attr("y", d => y(d.value))
        .attr("width", xSubgroup.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", d => color(d.measure))
        .on("mouseover", function(event, d) {
            d3.select(this).attr("opacity", 0.8);
            
            // Tooltip
            d3.select("#education-vs-measures-chart")
                .append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("background-color", "rgba(0,0,0,0.7)")
                .style("color", "white")
                .style("padding", "5px")
                .style("border-radius", "5px")
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px")
                .html(`Educación: ${d.education}<br>Medidas: ${d.measure}<br>Cantidad: ${d.value}`);
        })
        .on("mouseout", function() {
            d3.select(this).attr("opacity", 1);
            d3.selectAll(".tooltip").remove();
        });
    
    // Añadir título
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Nivel Educativo vs Medidas de Seguridad");
    
    // Añadir leyenda
    const legend = svg.append("g")
        .attr("transform", `translate(${width + 20}, 0)`);
    
    measureGroups.forEach((measure, i) => {
        legend.append("rect")
            .attr("x", 0)
            .attr("y", i * 20)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", color(measure));
        
        legend.append("text")
            .attr("x", 20)
            .attr("y", i * 20 + 12)
            .text(measure)
            .style("font-size", "12px");
    });
}

// Función para crear gráfico de Uso de Redes Sociales vs Violaciones de Privacidad
function createUsageVsViolationsChart() {
    // Datos simulados para el gráfico
    const data = [
        {usage: 'Menos de 1 hora', status: 'Ha experimentado', value: 12},
        {usage: 'Menos de 1 hora', status: 'No ha experimentado', value: 55},
        
        {usage: '1-2 horas', status: 'Ha experimentado', value: 43},
        {usage: '1-2 horas', status: 'No ha experimentado', value: 102},
        
        {usage: '2-4 horas', status: 'Ha experimentado', value: 87},
        {usage: '2-4 horas', status: 'No ha experimentado', value: 111},
        
        {usage: 'Más de 5 horas', status: 'Ha experimentado', value: 92},
        {usage: 'Más de 5 horas', status: 'No ha experimentado', value: 21}
    ];
    
    // Dimensiones y márgenes
    const margin = {top: 30, right: 150, bottom: 70, left: 80},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // Crear el elemento SVG
    const svg = d3.select("#usage-vs-violations-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Grupos para ejes X
    const usageGroups = Array.from(new Set(data.map(d => d.usage)));
    const statusGroups = Array.from(new Set(data.map(d => d.status)));
    
    // Escalas X e Y
    const x = d3.scaleBand()
        .domain(usageGroups)
        .range([0, width])
        .padding(0.2);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) * 1.1])
        .range([height, 0]);
    
    // Escala para subgrupos
    const xSubgroup = d3.scaleBand()
        .domain(statusGroups)
        .range([0, x.bandwidth()])
        .padding(0.05);
    
    // Escala de color
    const color = d3.scaleOrdinal()
        .domain(statusGroups)
        .range(['#e74c3c', '#2ecc71']);
    
    // Añadir ejes
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle");
    
    svg.append("g")
        .call(d3.axisLeft(y));
    
    // Crear grupos para cada nivel de uso
    const usageGroupsElements = svg.selectAll("g.usage")
        .data(usageGroups)
        .enter()
        .append("g")
        .attr("class", "usage")
        .attr("transform", d => `translate(${x(d)},0)`);
    
    // Crear barras para cada subgrupo
    usageGroupsElements.selectAll("rect")
        .data(d => {
            return statusGroups.map(status => {
                const matchingData = data.find(item => item.usage === d && item.status === status);
                return {
                    usage: d,
                    status: status,
                    value: matchingData ? matchingData.value : 0
                };
            });
        })
        .enter()
        .append("rect")
        .attr("x", d => xSubgroup(d.status))
        .attr("y", d => y(d.value))
        .attr("width", xSubgroup.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", d => color(d.status))
        .on("mouseover", function(event, d) {
            d3.select(this).attr("opacity", 0.8);
            
            // Tooltip
            d3.select("#usage-vs-violations-chart")
                .append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("background-color", "rgba(0,0,0,0.7)")
                .style("color", "white")
                .style("padding", "5px")
                .style("border-radius", "5px")
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px")
                .html(`Uso: ${d.usage}<br>Estado: ${d.status}<br>Cantidad: ${d.value}`);
        })
        .on("mouseout", function() {
            d3.select(this).attr("opacity", 1);
            d3.selectAll(".tooltip").remove();
        });
    
    // Añadir título
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Uso de Redes Sociales vs Violaciones de Privacidad");
    
    // Añadir leyenda
    const legend = svg.append("g")
        .attr("transform", `translate(${width + 20}, 0)`);
    
    statusGroups.forEach((status, i) => {
        legend.append("rect")
            .attr("x", 0)
            .attr("y", i * 20)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", color(status));
        
        legend.append("text")
            .attr("x", 20)
            .attr("y", i * 20 + 12)
            .text(status)
            .style("font-size", "12px");
    });
}
