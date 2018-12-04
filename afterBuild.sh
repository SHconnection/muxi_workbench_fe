# curl 'https://oapi.dingtalk.com/robot/send?access_token=0675190a9271e645bd3fde2def86179573d127ade095a770cad6a357f7ab0934' \
#    -H 'Content-Type: application/json' \
#    -d '
#   {"msgtype": "text", 
#     "text": {
#         "content": "部署🐔叫你部署啦！版本号：'$TRAVIS_TAG'"
#      }
#   }'