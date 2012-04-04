#!/bin/sh

RESOURCE_FOLDER="./media/"

mkdir -p ${RESOURCE_FOLDER}
lessc src/style.less --yui-compress > ${RESOURCE_FOLDER}socialshare.min.css
uglifyjs src/socialshare.js > ${RESOURCE_FOLDER}socialshare.min.js
cp -r src/img/ ${RESOURCE_FOLDER}img/
cp src/OpenSans-Light.ttf ${RESOURCE_FOLDER}
