pipeline {
    agent any
    environment {
        DOCKER_HOST = 'docker' // Docker主机
        JENKINS_HOST = 'jenkins' // jenkins
        VUEAPP_HOST = 'web'    // webapp服务主机
        GIT_REPO = 'https://github.com/JoyfulLL/onlineLab.git'
        DOCKER_REGISTRY = '192.168.50.86:8099/vue'
        DOCKER_IMAGE_TAG = 'v1.0.1'
        ANSIBLE_PLAYBOOK_DIR = '/opt/ansible/playbook' // Ansible剧本存储路径
    }
    stages {
        // 阶段1：环境预检
        stage('Environment Validation(Docker)') {
            steps {
                script {
                    // 初始化标志变量
                    env.NODE_MISSING = 'false'
                    env.YARN_MISSING = 'false'
                    env.DOCKER_COMPOSE_MISSING = 'false'

                    // 检查 Node.js
                    def nodeCheck = sh(script: "ansible ${env.DOCKER_HOST} -m shell -a 'node --version'", returnStatus: true)
                    if (nodeCheck != 0) {
                        echo 'Node.js 未安装'
                        env.NODE_MISSING = 'true'
                    }

                    // 检查 npm
                    def yarnCheck = sh(script: "ansible ${env.DOCKER_HOST} -m shell -a 'yarn --version'", returnStatus: true)
                    if (yarnCheck != 0) {
                        echo 'yarn 未安装'
                      // sh""" corepack enable """
                    }

                    // 检查 Docker Compose
                    def dockerComposeCheck = sh(script: "ansible ${env.DOCKER_HOST} -m shell -a 'docker compose version'", returnStatus: true)
                    if (dockerComposeCheck != 0) {
                        echo 'Docker Compose 未安装'
                        env.DOCKER_COMPOSE_MISSING = 'true'
                    }
                }
            }
        }

        // 阶段2：环境安装
        // env.yml剧本将自动检测是否安装，安装之后会跳过，避免重复安装
        // stage('Environment Provisioning') {
        //     steps {
        //         script {
        //             // 执行环境安装剧本
        //             sh """
        //                 ansible-playbook -i ${env.DOCKER_HOST}, ${ANSIBLE_PLAYBOOK_DIR}/env.yml \
        //                     -e "env_source_host=${env.JENKINS_HOST}" \
        //                     -e "go_package=go1.23.4.linux-amd64.tar.gz" \
        //                     -e "node_package=node-v22.12.0-linux-x64.tar.xz"
        //             """

        //             // 验证安装结果
        //             sh """
        //                 ansible ${env.DOCKER_HOST} -m shell -a '
        //                     go version &&
        //                     node -v &&
        //                     npm -v
        //                 '
        //             """
        //         }
        //     }
        // }
        // 阶段2
        stage('Environment Provisioning') {
            steps {
                script {
                    if (env.NODE_MISSING == 'true') {
                        echo '正在安装 Node.js与yarn'
                        // 拷贝 Node.js 安装包到目标主机
                        sh """
                        ansible-playbook -i ${env.DOCKER_HOST}, ${ANSIBLE_PLAYBOOK_DIR}/copy_install_Node.yml
                """
                    }
                //     if (env.YARN_MISSING == 'true') {
                //         echo '正在安装 Node.js与yarn'
                //         // 拷贝 Node.js 安装包到目标主机
                //         sh """
                //         ansible-playbook -i ${env.DOCKER_HOST}, ${ANSIBLE_PLAYBOOK_DIR}/copy_install_Node.yml
                // """
                //    }
                    if (env.DOCKER_COMPOSE_MISSING == 'true') {
                        echo '正在安装 Docker Compose...'
                        
                    }

                else {
                        echo '环境已满足，无需安装'
                    }
                }
            }

            post {
                failure {
                    error "有错误，请检查日志！"
                }
            }
        }

        // 阶段3：持续集成（CI）
        // 代码质量检测并编译
        stage('Continuous Integration') {
            steps {
                script {
                    sh """
                        ansible-playbook ${ANSIBLE_PLAYBOOK_DIR}/core.yml || exit 1
                    """
                }
            }
            post {
                failure {
                    error '核心步骤未通过，终止流程！'
                }
            }
        }

        // 阶段4：环境预检2
        stage('Environment Validation(app)') {
            steps {
                script {
                    // 检测Web节点可用性
                    sh "ansible ${env.VUEAPP_HOST} -m ping"
                    // 检测8080端口是否开放
            //         def portCheck = sh(script: "ansible ${env.VUEAPP_HOST} -m shell -a 'netstat -tln | grep :8080'", returnStatus: true)
            //         if (portCheck != 0) {
            //             error '目标主机8080端口未开放，请检查服务配置！'
            // } else {
            //             echo '8080端口正常开放'
            //         }
                }
            }
            post {
                failure {
                    error 'Web服务器未启动，请检查！'
                }
            }
        }

        // 阶段5：持续交付（CD）
        stage('Continuous Delivery') {
            steps {
                script {
                    // 执行CD剧本
                    sh """
                        ansible-playbook ${ANSIBLE_PLAYBOOK_DIR}/CD.yml --extra-vars "docker_image_tag=${DOCKER_IMAGE_TAG}" || exit 1
                    """
                }
            }
            post {
                failure {
                    error '镜像构建失败，终止流程！'
                }
            }
        }

        // 阶段6：程序部署
        stage('Check HTTP Status') {
            steps {
                script {
                    // 执行Web部署剧本
                    sh """
                        ansible-playbook ${ANSIBLE_PLAYBOOK_DIR}/deploy-app.yml --extra-vars "docker_image_tag=${DOCKER_IMAGE_TAG}" || exit 1
                    """
                }
            }
            post {
                failure {
                    error '服务启动失败，终止流程！'
                }
            }
        }
    }
}
