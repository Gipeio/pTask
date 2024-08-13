pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                // Ici, tu pourrais avoir une commande pour compiler ton projet
                // Par exemple, pour un projet Java: sh 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing...'
                // Ici, tu pourrais exécuter des tests unitaires
                // Par exemple: sh 'mvn test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}
