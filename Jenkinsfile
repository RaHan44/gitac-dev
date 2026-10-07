pipeline{
    agent any
    stages{
        stage('checkout'){
            steps{
                deleteDir()
                sh '''
                    git clone https://github.com/RaHan44/gitac-dev.git
                    ls -l
                '''
            }
        }
        stage('deploy'){
            steps{
                sh '''
                    cp -r gitac-dev/* /var/www/html
                    ls -l /var/www/html
                '''
                    
            }
        }
        
    }
}
