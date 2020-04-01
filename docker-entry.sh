#!/bin/sh

echo "#### Fetching Go Dependencies ####"
go get -v ./...
go get -v github.com/gemnasium/migrate



#Get DB password
dbPass=$(grep -o '"DbPassword": *"[^"]*"' config.json | grep -o '"[^"]*"$' | tr -d \") \

echo "Waiting for MySQL to accept incoming connections"
maxtry=3
while [ $maxtry -gt 0 ]; do
  nc -z db 3306
  isopen=$?
  if [ $isopen -eq 0 ]; then
    break
  fi
  maxtry=maxtry-1
  sleep 1
done


echo "#### Running Migrations ####"
migrate -url "mysql://root:$dbPass@tcp(db:3306)/edtech_csf" -path ./migrations up
echo "#### Starting Server ####"
go run main.go
