cnpm install
npm run build
mkdir ./output
cp -r ./bootstrap.sh ./app.js ./package.json ./dist/static ./dist/index.html ./output
cd ./output
kill -9 $(lsof -i:80 -t)
bash bootstrap.sh &