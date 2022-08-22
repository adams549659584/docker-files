# 使用说明

> 仅临时使用，web不考虑配置泄露问题

> ctrl + shift + v 粘贴至 web ssh，执行完成后，点击 9002 端口查看客户端配置

```sh
# 单独安装 docker-playground-v2ray 
# docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
sudo chmod +x /usr/local/bin/docker-compose && \
# git clone dockerfile and start
git clone https://github.com/adams549659584/docker-files && \
cd docker-files/docker-playground-v2ray && \
sudo docker network create MyNetwork || true && \
sudo docker-compose up -d
```

> 本站内容或服务用于个人学习、研究或欣赏，以及其他非商业性或非盈利性用途，但同时应遵守著作权法及其他相关法律的规定，通过使用本站内容或服务随之而来的风险与本人无关。