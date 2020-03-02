#! /bin/bash
source /etc/profile
npm set registry http://bnpm.byted.org
export NODE_ENV='production' &&  node app.js
