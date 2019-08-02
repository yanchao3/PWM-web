#!/bin/bash
DIR="/opt/PWM-web"
DJANGO_ADDESS=$1
DJANGO_PORT=$2
WEB_PORT=$3
a=`cd $DIR && grep -R 10.50.182.65 *|awk -F ":" '{print $1}'`
for i in $a
do
    sed -i 's/10.50.182.65:888/'$DJANGO_ADDESS':'$DJANGO_PORT'/g' /opt/PWM-web/$i
done

sed -i 's/8080/'$3'/g' /opt/PWM-web/jy_cmdb_vue/config/index.js

cd /opt/PWM-web/jy_cmdb_vue && npm run dev
