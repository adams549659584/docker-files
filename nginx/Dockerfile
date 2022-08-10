FROM nginx:latest

# 镜像信息
LABEL Author="adams549659584"
LABEL Version="1.0"
LABEL Description="Nginx 镜像 timezone: Asia/Shanghai"

# 时区指定为 Asia/Shanghai, 默认为: Etc/UTC
ENV TIMEZONE Asia/Shanghai

# 配置系统时区为 Asia/Shanghai 时区
RUN ln -snf /usr/share/zoneinfo/$TIMEZONE /etc/localtime && echo $TIMEZONE > /etc/timezone

# ADD ./run.sh /usr/share/nginx/

# WORKDIR /usr/share/nginx/

# RUN chmod +x ./run.sh
 
# CMD ["sh","./run.sh"]