pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the GitHub repository
                git branch: 'man', url: 'https://github.com/ManoharMP3/evershop123.git'
            }
        }
        
        stage('Test') {
            steps {
                // Install jest-junit and run tests
                bat 'npm i jest-junit'
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
            archiveArtifacts 'test-results/cobertura-coverage.xml'
        }
        success {
            // Publish HTML code coverage report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'test-results',
                reportFiles: 'index.html',
                reportName: 'Code Coverage Report'
            ])
        }
    }
}
