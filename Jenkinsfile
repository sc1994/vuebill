pipeline {
  agent none
  stages {
    stage('install') {
      steps {
        sh 'npm install'
      }
    }
    stage('run') {
      steps {
        sh 'npm run dev'
      }
    }
  }
}