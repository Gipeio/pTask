pipeline {
    agent any  // Utiliser n'importe quel agent disponible

    stages {
        stage('Checkout') {
            steps {
                // Cloner le dépôt Git
                checkout scm
            }
        }
        stage('Build') {
            steps {
                // Commande de build (à remplacer par la commande spécifique à ton projet)
                echo 'Building...'
                // Exemple pour un projet Maven :
                // sh 'mvn clean install'
            }
        }
        stage('Test') {
            steps {
                // Commande de test (à remplacer par la commande spécifique à ton projet)
                echo 'Testing...'
                // Exemple pour un projet Maven :
                // sh 'mvn test'
            }
        }
        stage('Archive') {
            steps {
                // Archiver les résultats de build ou de test
                echo 'Archiving...'
                // Exemple pour archiver les artefacts de build :
                // archiveArtifacts 'target/*.jar'
            }
        }
    }
    post {
        always {
            // Actions à toujours exécuter, que le build ait réussi ou échoué
            echo 'Pipeline terminé'
        }
    }
}
