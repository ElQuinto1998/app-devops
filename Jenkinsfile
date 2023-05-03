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
        git branch: 'main', url: "${urlRepo}"
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
          sh "docker build ${dockerimagename}"            
          withDockerRegistry([credentialsId: registryCredential, url: urlRegistry]) {                                
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