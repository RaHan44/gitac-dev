pipeline{
    agent none
    stages{
        stage('checkout'){
            agent{
                label 'buildagent'
            }
            steps{
                deleteDir()
                sh '''
                    git clone https://github.com/RaHan44/gitac-dev.git
                    ls -l
                '''
                stash name:'website', includes: 'gitac-dev/**'
            }
        }
        stage('deploy'){
            agent{
                label 'deployagent'
            }
            steps{
                deleteDir()
                unstash 'website'
                sh '''
                    sudo cp gitac-dev/* /var/www/html
                '''
            }
        }
    }
}
