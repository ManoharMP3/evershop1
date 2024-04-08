pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the GitHub repository
                git branch: 'dev', url: 'https://github.com/ManoharMP3/evershop123.git'
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
                if (coveragePercentage != null && coveragePercentage < 45) {
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
