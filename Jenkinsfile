pipeline {
  agent any
  stages {
    stage('prepare enviroment') {
      steps {
        sh 'node -v || apk add --update nodejs'
        sh 'npm -v || apk add -update npm'
      }
    }

    stage('install dependencies') {
      steps {
        sh 'npm i'
      }
    }

    stage('build sources') {
      steps {
        sh 'npm run build'
      }
    }

  }
}