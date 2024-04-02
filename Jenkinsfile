pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the GitHub repository
                git branch: 'main', url: 'https://github.com/ManoharMP3/evershop123.git'
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
    }
}
