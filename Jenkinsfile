pipeline {

  environment {
    dockerimagename = "elquinto98/quintoapp"
    dockerImage = ""
    urlRepo = 'urlRepo'
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git urlRepo
      }
    }

    stage('Build image') {
      steps{
        script {
          dockerImage = docker.build dockerimagename
        }
      }
    }

    stage('Pushing Image') {
      environment {
        registryCredential = 'acr-credentials'
        urlRegistry = 'urlRegistry'
      }
      steps{
        script {
          docker.withRegistry([ url: urlRegistry, credentialsId: registryCredential ]) {
            dockerImage.push("latest")
          }
        }
      }
    }

    stage('Deploying App to Kubernetes') {
      steps {
        app = docker.image(urlRegistry + dockerimagename + :latest)            
        withDockerRegistry([credentialsId: 'acr_credentials', url: urlRegistry]) {            
          app.pull() 
          sh "kubectl create -f ./deploy/deployment-service.yml"
        }
      }
    }

  }

}