# 使用说明

> 按需调整根目录的docker-compose.yml（注释的容器恢复即可）

> 或进入单个项目文件夹内启动


### oracle cloud 一把梭

```sh
# 1. 设置密码
ROOT_PASSWD="你的root密码" && \
echo -e "${ROOT_PASSWD}\n${ROOT_PASSWD}\n" | sudo passwd root && \
# 2. 安装 docker docker compose docker container
sudo apt update && \
sudo apt -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common && \
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && \
sudo add-apt-repository -y "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" && \
sudo apt update && \
sudo apt -y install docker-ce docker-ce-cli containerd.io && \
sudo usermod -aG docker $USER && \
#  docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.9.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
sudo chmod +x /usr/local/bin/docker-compose && \
# git clone dockerfile and start
git clone https://github.com/adams549659584/docker-files && \
cd docker-files && \
sudo docker network create MyNetwork && \
sudo docker-compose up -d && \
# 3. 开启 BBR 加速
sudo sed -i "$ a net.core.default_qdisc=fq" /etc/sysctl.conf && \
sudo sed -i "$ a net.ipv4.tcp_congestion_control=bbr" /etc/sysctl.conf && \
sudo sysctl -p
```

> 本站内容或服务用于个人学习、研究或欣赏，以及其他非商业性或非盈利性用途，但同时应遵守著作权法及其他相关法律的规定，通过使用本站内容或服务随之而来的风险与本人无关。