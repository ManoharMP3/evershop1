pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the GitHub repository
                git branch: 'main', url: 'https://github.com/ManoharMP3/evershop123.git'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                // Run SonarScanner to perform code analysis
                bat 'sonar-scanner.bat -D"sonar.projectKey=evershop327" -D"sonar.sources=." -D"sonar.host.url=https://047d-2405-201-d049-3861-11b-ed8c-6430-6199.ngrok-free.app/" -D"sonar.token=sqp_33487c8e4e100c922f6d28a2639f7aa19542d270"'
            }
        }
        
        stage('Test') {
            steps {
                // Install jest-junit and run tests
                bat 'npm install regenerator-runtime'
                bat 'npx jest --coverage ./unit'
            }
            post {
                success {
                    echo 'Tests passed successfully!'
                }
                failure {
                    echo 'Tests failed! Please check the logs for more details.'
                    error 'Tests failed!'
                }
            }
        }
    }
    post {
        always {
            // Publish JUnit test results
            junit 'test-results/junit.xml'
            // Archive code coverage report
            archiveArtifacts 'test-results/junit.xml'
            archiveArtifacts 'test-results/cobertura-coverage.xml'
            archiveArtifacts 'test-results/index.html'
            
            // Calculate code coverage percentage
            script {
                def coverageXml = readFile('test-results/cobertura-coverage.xml')
                def matcher = coverageXml =~ /line-rate="([\d.]+)"/
                def coveragePercentage = matcher ? Float.parseFloat(matcher[0][1]) * 100 : null

                // Check if code coverage is below the threshold (e.g., 70%)
                if (coveragePercentage != null && coveragePercentage < 70) {
                    echo "Code coverage dropped below 70% (${coveragePercentage}%), failing the pipeline."
                    error "Code coverage dropped below 70% (${coveragePercentage}%)"
                } else {
                    echo "Code coverage (${coveragePercentage}%) meets or exceeds the threshold (70%)."
                }
            }
        }
        success {
            // Publish HTML code coverage report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'Man',
                reportFiles: 'index.html',
                reportName: 'Code Coverage Report'
            ])
        }
        failure {
            echo 'Tests failed! Please check the logs for more details.'
            error 'Tests failed!'
            
        }
        
    }
    
} 
