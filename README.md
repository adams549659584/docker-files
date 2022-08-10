# init
```bash
# 1. 设置密码
sudo passwd root && \
# 2. 安装 docker docker compose docker container
sudo apt update && \
sudo apt -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common && \
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && \
sudo add-apt-repository -y "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" && \
sudo apt update && \
sudo apt -y install docker-ce docker-ce-cli containerd.io && \
sudo usermod -aG docker $USER && \
#  docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.7.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
sudo chmod +x /usr/local/bin/docker-compose && \
# git clone dockerfile and start
git clone https://github.com/adams549659584/docker-files && \
cd docker-files && \
sudo docker network create MyNetwork && \
sudo docker-compose up -d


# 3. 开启 BBR
su
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf && \
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf && \
sysctl -p
```