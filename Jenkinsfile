pipeline {

  environment {
    dockerimagename = "elquinto98/quintoapp"
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
        urlRegistry = 'urlRegistry'
      }
      steps {
        script {
          //app = docker.build(dockerimagename)    
          sh "docker build -t ${dockerimagename} ."            
          withDockerRegistry([credentialsId: 'acr-credentials', url: 'https://myregistryrepo.azurecr.io']) {                                
            ssh "docker push ${dockerimagename}:latest"     
          }
        }
      }
    }

    stage('Deploying App to Kubernetes') {
      steps {
        script {
          app = docker.image(urlRegistry + dockerimagename + ':latest')            
          withDockerRegistry([credentialsId: 'acr_credentials', url: urlRegistry]) {            
            app.pull() 
            sh "kubectl create -f ./deploy/deployment-service.yml"
          }
        }
      }
    }

  }

}