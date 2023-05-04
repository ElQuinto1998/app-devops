pipeline {

  environment {
    dockerimagename = "quintoapp"
    dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git branch: 'main', url: 'https://github.com/ElQuinto1998/app-devops.git'
      }
    }

    stage('Build and Push image') {
      environment {
        registryCredential = 'acr-credentials'
      }
      steps {
        script {   
          sh "docker build -t myregistryrepo.azurecr.io/${dockerimagename} ."            
          withDockerRegistry([credentialsId: 'acr-credentials', url: 'https://myregistryrepo.azurecr.io']) {                                
            ssh "docker push ${dockerimagename}:latest"     
          }
        }
      }
    }

    stage('Deploying App to Kubernetes') {
      steps {
        script {
          app = docker.image("myregistryrepo.azurecr.io/${dockerimagename}:latest")            
          withDockerRegistry([credentialsId: 'acr-credentials', url: 'https://myregistryrepo.azurecr.io']) {            
            app.pull() 
            sh "kubectl create -f ./deploy/deployment-service.yml"
          }
        }
      }
    }

  }

}