export PORT=80
#nohup npm start > nohup.log &
nohup forever ./bin/www >> nohup.log &
