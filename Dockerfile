#Author:YANCHAO
FROM node:10
MAINTAINER yanchao@jieyuechina.com
ENV EZ_DIR=/opt/
ENV PROJECT_DIR=/opt/PWM-web
ENV DJANGO_ADDESS="10.50.182.65"
ENV DJANGO_PORT=888
ENV WEB_PORT=8080
WORKDIR $EZ_DIR
RUN npm set registry https://registry.npm.taobao.org
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install -g @vue/cli
ADD PWM-web.tar.gz /opt/
ADD install.sh /opt/
RUN chmod +x /opt/install.sh
EXPOSE 8080
#CMD ["${DJANGO_ADDESS}",${DJANGO_PORT},"${WEB_ADDRESS}","${WEB_PORT}"]
ENTRYPOINT /opt/install.sh ${DJANGO_ADDESS} ${DJANGO_PORT} ${WEB_PORT}
#ENTRYPOINT ["/bin/sh","-c","top"]
