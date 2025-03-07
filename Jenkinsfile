pipeline {
  agent any
  stages {
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

        echo 'Hello'
      }
    }

    stage('Environment Provisioning') {
      steps {
        script {
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

    stage('Code Quality Gate') {
      post {
        failure {
          error '核心步骤未通过，终止流程！'
        }

      }
      steps {
        script {
          sh """
          ansible-playbook ${ANSIBLE_PLAYBOOK_DIR}/playbook.yml || exit 1
          """
        }

      }
    }

    stage('Environment Validation(app)') {
      post {
        failure {
          error 'APP服务器未启动，请检查！'
        }

      }
      steps {
        script {
          sh "ansible ${env.VUEAPP_HOST} -m ping"
        }

      }
    }

    stage('Post-Deploy') {
      post {
        failure {
          error '服务启动失败，终止流程！'
        }

      }
      steps {
        script {
          sh """
          ansible-playbook ${ANSIBLE_PLAYBOOK_DIR}/deploy-app.yml || exit 1
          """
        }

      }
    }

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
  environment {
    DOCKER_HOST = 'docker'
    JENKINS_HOST = 'jenkins'
    VUEAPP_HOST = 'web'
    GIT_REPO = 'https://github.com/JoyfulLL/onlineLab.git'
    DOCKER_REGISTRY = 'vueharbor.com:7777/vue'
    ANSIBLE_PLAYBOOK_DIR = '/opt/ansible/playbook'
  }
}