cnpm install
npm run build
cp ./bootstrap.sh ./app.js ./package.json ./package-lock.json ./output
cd ./output
kill -9 $(lsof -i:80 -t)
bash bootstrap.sh &