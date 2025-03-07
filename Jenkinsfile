pipeline {
    agent any
    environment {
        DOCKER_HOST = 'docker' // Docker主机
        JENKINS_HOST = 'jenkins' // jenkins
        VUEAPP_HOST = 'web'    // webapp服务主机
        GIT_REPO = 'https://github.com/JoyfulLL/onlineLab.git'
        DOCKER_REGISTRY = 'vueharbor.com:7777/vue'
        ANSIBLE_PLAYBOOK_DIR = '/opt/ansible/playbook' // Ansible剧本存储路径
    }
    stages {
        // 阶段1：环境预检
        stage('Environment Validation(Docker)') {
            steps {
                script {
                    def validation_result = sh(
                        script: """
                            ansible ${env.DOCKER_HOST} -m shell -a '
                                node --version &&
                                npm --version &&
                                docker compose version
                            '
                        """,
                        returnStatus: true
                    )

                    if (validation_result != 0) {
                        error "环境检测失败，缺少必要的工具，请检查日志！"
                    }
                }
            }
        }

        // 阶段2：环境安装
        // env.yml剧本将自动检测是否安装，安装之后会跳过，避免重复安装
        stage('Environment Provisioning') {
            steps {
                script {
                    // 执行环境安装剧本
                    sh """
                        ansible-playbook -i ${env.DOCKER_HOST}, ${ANSIBLE_PLAYBOOK_DIR}/env.yml \
                            -e "env_source_host=${env.JENKINS_HOST}" \
                            -e "go_package=go1.23.4.linux-amd64.tar.gz" \
                            -e "node_package=node-v22.12.0-linux-x64.tar.xz"
                    """

                    // 验证安装结果
                    sh """
                        ansible ${env.DOCKER_HOST} -m shell -a '
							set -e
                            node -v && 
                            go version && 
                            npm -v
                        '
                    """
                }
            }
        }

        // 阶段3：代码质量检测并编译
        // 
        stage('Code Quality Gate') {
           // agent docker // 在docker主机执行
            steps {
                script {
                    sh """
                        ansible-playbook ${ANSIBLE_PLAYBOOK_DIR}/playbook.yml || exit 1
                    """
                }
                
            }
            post {
                failure {
                    error "核心步骤未通过，终止流程！"
                }
            }
        }

        // 阶段4：环境预检2
        stage('Environment Validation(app)') {
            steps {
                script {
                    // 检测Docker节点可用性
                    sh "ansible ${env.VUEAPP_HOST} -m ping"
                }
            }
            post {
                failure {
                    error "APP服务器未启动，请检查！"
                }
            }
        }


        // 阶段5：部署服务
        stage('Post-Deploy') {
            steps {
                script {
                    // 执行部署web剧本
                    sh """
                        ansible-playbook ${ANSIBLE_PLAYBOOK_DIR}/deploy-app.yml || exit 1
                    """
                }
            }
            post {
                failure {
                    error "服务启动失败，终止流程！"
                }
            }
        }

        // 阶段6：服务验证
        stage('Check HTTP Status') {
            steps {
                script {
                    def statusCode = sh(script: "curl -o /dev/null -s -w '%{http_code}' http://192.168.50.106/login", returnStdout: true).trim()
                    if (statusCode != "200") {
                        error "HTTP check failed! Status code: ${statusCode}"
                    } else {
                        echo "HTTP check passed! Status code: ${statusCode}"
                    }
                }
            }
        }
      
    }
}
