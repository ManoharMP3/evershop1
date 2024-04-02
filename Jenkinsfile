pipeline {
    agent any
    
    stages {
        stage('Preparation') {
            steps {
                // Clean workspace before checkout
                cleanWs()
            }
        }
        
        stage('Checkout') {
            steps {
                // Checkout the code from the GitHub repository
                git branch: 'man', url: 'https://github.com/ManoharMP3/evershop123.git'
            }
        }
        
        stage('Test') {
            steps {
                // Install jest-junit and run tests
                bat 'npx install regenerator-runtime'
                bat 'npx jest --coverage ./unit'
            }
            post {
                // Actions to perform after the stage
                success {
                    echo 'Tests passed successfully!'
                }
                failure {
                    echo 'Tests failed! Please check the logs for more details.'
                    // You may want to add additional actions here, such as sending notifications
                }
            }
        }
    }
}
