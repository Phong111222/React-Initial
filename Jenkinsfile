pipeline {

    agent any

    // This tool uses for SonarQube scanner
    tools {nodejs "nodejs"}

    environment {
        // Author or committer name = developer
        COMMITTER_NAME = sh (
          script: 'git show --name-only',
          returnStdout: true
        ).trim()
        // Project name
        PROJECT_NAME = "STS-Intergram-FE-Admin"
        PROJECT_NAME_RELEASE_NAME_HELM_CHART = "sts-intergram-fe-admin"
        // Docker images name auto generating
        DOCKER_IMAGE = "saigontechnologysoftware/sts-intergram/sts-intergram-frontend-admin"
        DOCKER_TAG = "${env.BRANCH_NAME}-${env.GIT_COMMIT}-${BUILD_NUMBER}"
        // Nexus repository for images and Helm chart
        DOCKER_NEXUS_REGISTRY_URL = "171.244.43.95:8083"
        //NEXUS_URL = "http://171.244.43.95:8081"
        // Kubernetes
        KUBERNETES_NAMESPACE = "${env.BRANCH_NAME == "dev" ? "dev" : "${env.BRANCH_NAME == "staging" ? "staging" : "master-intergram"}"}"
        // PATH for Helm in Kuberneter
        PATH = "$PATH:/usr/local/bin"
        // Build config environment variable to built images
        //build_config = "${env.BRANCH_NAME == "dev" ? "development" : "${env.BRANCH_NAME == "staging" ? "staging" : "production"}"}"
    }

    stages {
        // Use SonarQube Scanner to scan code, check code convention and coverage code (if unit test have). This stage will run for all branches and for each commit and PR
        stage('Code scan SonarQube') {
            steps {
                // Check all env again
                sh 'printenv'
                // Creat new project on SonarQube site
                script {
                    def scannerHome = tool 'sonarqube-scanner';
                    withSonarQubeEnv("sonarqube-server") {
                    sh """${tool("sonarqube-scanner")}/bin/sonar-scanner \
                    -Dsonar.projectKey=${PROJECT_NAME} \
                    -Dsonar.sources=. \
                    -Dsonar.projectName=${PROJECT_NAME} \
                    -Dsonar.projectVersion=1.0 """
                    }
                }
            }
        }

        stage("Quality Gate") {
            // Coverage code set at 80% to PASS. But for now, we don't have unit test, so we don't have coverage code. This Gateway will take some metrics like: bugs, smell code,...
            steps {
                timeout(time: 20, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
                }
            }
        }

        stage("Build Docker images") {
            // This stage use for built iamge only for particular branches: master, staging and dev anh then tag the latest images. So 2 images will be generated
            when {
                anyOf {
                    branch 'master';
                    branch 'staging';
                    branch 'dev'
                }
            }
            steps {

                script{
                    if (env.BRANCH_NAME == 'dev'){
                        withCredentials([file(credentialsId: 'INTERGRAM_FILE_ADMIN_ENV_DEV', variable: 'INTERGRAM_FILE_ADMIN_ENV_DEV')]) {
                            sh """
                            cp -f ${INTERGRAM_FILE_ADMIN_ENV_DEV} .env
                            """
                    }
                    } else if (env.BRANCH_NAME == 'staging'){
                        withCredentials([file(credentialsId: 'INTERGRAM_FILE_ADMIN_ENV_UAT', variable: 'INTERGRAM_FILE_ADMIN_ENV_UAT')]) {
                            sh """
                            cp -f ${INTERGRAM_FILE_ADMIN_ENV_UAT} .env
                            """
                    }
                
                    } else if (env.BRANCH_NAME == 'master'){
                        withCredentials([file(credentialsId: 'INTERGRAM_FILE_ADMIN_ENV_MASTER', variable: 'INTERGRAM_FILE_ADMIN_ENV_MASTER')]) {
                            sh """
                            cp -f ${INTERGRAM_FILE_ADMIN_ENV_MASTER} .env
                            """
                    }
                
                    }
                }                
                sh """
                    docker build -t ${DOCKER_NEXUS_REGISTRY_URL}/${DOCKER_IMAGE}:${DOCKER_TAG} .
                    docker tag ${DOCKER_NEXUS_REGISTRY_URL}/${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_NEXUS_REGISTRY_URL}/${DOCKER_IMAGE}:${env.BRANCH_NAME}-latest
                """
            }
        }

        stage("Push images to private repository") {
            // We use Nexus as private repository, storing all Docker images instead of using Docker hub
            when {
                anyOf {
                    branch 'master';
                    branch 'staging';
                    branch 'dev'
                }
            }
            steps {
                // Login to Docker Nexus Private Registry
                withCredentials([usernamePassword(credentialsId: 'Jenkins-Docker-Nexus-Repository', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo $DOCKER_PASSWORD | docker login ${DOCKER_NEXUS_REGISTRY_URL} --username $DOCKER_USERNAME --password-stdin '
                }

                // Push images to Docker Nexus private registry
                sh "docker push ${DOCKER_NEXUS_REGISTRY_URL}/${DOCKER_IMAGE}:${DOCKER_TAG}"
                sh "docker push ${DOCKER_NEXUS_REGISTRY_URL}/${DOCKER_IMAGE}:${GIT_BRANCH}-latest"

                // Remove unused images, keeping others layer images for caching
                sh '''
                    docker image rm ${DOCKER_NEXUS_REGISTRY_URL}/${DOCKER_IMAGE}:${DOCKER_TAG}
                    docker image rm ${DOCKER_NEXUS_REGISTRY_URL}/${DOCKER_IMAGE}:${GIT_BRANCH}-latest
                '''
            }
        }

        stage("Deploying on K8s: dev") {
            when {
                anyOf {
                    branch 'dev'
                }
            }
            steps {
                script {
                    withCredentials([kubeconfigFile(credentialsId: 'kubernetes-server-dev-staging', variable: 'KUBECONFIG')]) {
                        dir('kubernetes/') {
                            // Deploy on Kubernetes with desinged namespaces. Release name Helm chat must consist of lower case
                            sh '''
                                helm list
                                helm upgrade --install --set namespace="${KUBERNETES_NAMESPACE}" --set image.repository="${DOCKER_NEXUS_REGISTRY_URL}/${DOCKER_IMAGE}" --set image.tag="${DOCKER_TAG}" ${PROJECT_NAME_RELEASE_NAME_HELM_CHART}-${GIT_BRANCH} ${PROJECT_NAME}-${GIT_BRANCH}/
                            '''
                        }
                    }
                }
            }
        }

        stage("Deploying on K8s: staging") {
            when {
                anyOf {
                    branch 'staging'
                }
            }
            steps {
                script {
                    withCredentials([kubeconfigFile(credentialsId: 'kubernetes-server-dev-staging', variable: 'KUBECONFIG')]) {
                        dir('kubernetes/') {
                            // Deploy on Kubernetes with desinged namespaces. Release name Helm chat must consist of lower case
                            sh '''
                                helm list
                                helm upgrade --install --set namespace="${KUBERNETES_NAMESPACE}" --set image.repository="${DOCKER_NEXUS_REGISTRY_URL}/${DOCKER_IMAGE}" --set image.tag="${DOCKER_TAG}" ${PROJECT_NAME_RELEASE_NAME_HELM_CHART}-${GIT_BRANCH} ${PROJECT_NAME}-${GIT_BRANCH}/
                            '''
                        }
                    }
                }
            }
        }

        stage('Manual approval'){
            // By recommendation, manual approval only need for master and staging branches, for dev branch - it will be automative
            when {
                branch 'master'
            }
            steps{
                // Take Google chat token for particular space or user using this guideline: https://support.google.com/chat/answer/9632691?hl=en&co=GENIE.Platform%3DAndroid
                withCredentials([string(credentialsId: 'GOOGLE_CHAT_TOKEN_INTERNAL_SERVICE', variable: 'GOOGLE_CHAT_TOKEN_INTERNAL_SERVICE')]) {
                    script {
                        hangoutsNotify message: "Go to Build URL and approve the deployment request",
                        token: "${GOOGLE_CHAT_TOKEN_INTERNAL_SERVICE}",
                        threadByJob: true
                    }
                }
                script {
                    input(id: "Deploy Gate", message: "Author: ${COMMITTER_NAME}, Deploy ${BUILD_TAG}?", ok: 'Deploy')
                }
            }
        }

        stage("Deploying on K8s: production") {
            when {
                branch 'master';
            }
            steps {
                script {
                    withCredentials([kubeconfigFile(credentialsId: 'kubernetes-server-master', variable: 'KUBECONFIG')]) {
                        dir('kubernetes/') {
                            // Deploy on Kubernetes with desinged namespaces. Release name Helm chat must consist of lower case
                            sh '''
                                helm list
                                helm upgrade --install --set namespace="${KUBERNETES_NAMESPACE}" --set image.repository="${DOCKER_NEXUS_REGISTRY_URL}/${DOCKER_IMAGE}" --set image.tag="${DOCKER_TAG}" ${PROJECT_NAME_RELEASE_NAME_HELM_CHART}-${GIT_BRANCH} ${PROJECT_NAME}-${GIT_BRANCH}/
                            '''
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            send_alert('SUCCESSFUL')
        }
        failure {
            send_alert('FAILED')
        }
        aborted {
            send_alert('ABORTED')
        }
    }
}
def send_alert(notify)
    {
        echo "${notify}"
        withCredentials([string(credentialsId: 'GOOGLE_CHAT_TOKEN_INTERNAL_SERVICE', variable: 'GOOGLE_CHAT_TOKEN_INTERNAL_SERVICE')]) {
            script {
                hangoutsNotify message: "Branch: ${env.BRANCH_NAME}, Author: ${COMMITTER_NAME}, Build Number: ${BUILD_NUMBER} => ${notify}!",
                token: "${GOOGLE_CHAT_TOKEN_INTERNAL_SERVICE}",
                threadByJob: true
            }
        }   
        always {
            cleanWs()
        }
    }
