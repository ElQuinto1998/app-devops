pipeline {

  environment {
    dockerimagename = "quintoapp"
    dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/ElQuinto1998/app-devops.git'
      }
    }

    stage('Build and Push image') {
      steps {
        script {   
          sh "docker build -t myregistryrepo.azurecr.io/${dockerimagename} ."            
          withDockerRegistry([credentialsId: 'acr-credentials', url: 'https://myregistryrepo.azurecr.io']) {                                
            sh "docker push myregistryrepo.azurecr.io/${dockerimagename}:latest"     
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
            sh "ls"
            //sh './kubectl create -f ./deploy/deployment-service.yml'
            sh './kubectl version'
            sh './kubectl get pods'
          }
        }
      }
    }

  }

}