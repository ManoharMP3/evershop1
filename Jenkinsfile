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
                bat 'npm i jest-junit'
                bat 'npx jest --coverage ./unit || exit 1' // Stop the pipeline if any test fails
            }
            post {
                success {
                    echo 'Tests passed successfully!'
                }
                failure {
                    echo 'Tests failed! Please check the logs for more details.'
                }
            }
        }
    }
}

