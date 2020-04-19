# EdTech_CSF

Due to the national shutdown of schools to combat the COVID pandemic in India, there is immense potential to use technology to ensure students are learning at home. 

In an effort to classify and make EdTech solutions easily available to parents, teachers, and students to ensure continued teaching and learning at home, this website provides access to online resources for students and teachers so that learning can effectively take place at home. All solutions listed are free of cost and categorized for use by teachers and students/parents.

## Prerequisites
- Go 1.10 [Download link](https://golang.org/dl/#go1.10)
- MySQL

## Check prerequisites
- Check the go version installed.
```
go version
```
## Build instructions

- Download the repository and `cd` into it.
```
go get github.com/PaiAkshay998/Edtech_CSF
cd $GOPATH/src/github.com/PaiAkshay998/Edtech_CSF
```
- Create databases and run migrations
```
mysql -u root -p -e "CREATE DATABASE edtech_csf;"
migrate -url "mysql://root:YOUR_MYSQL_ROOT_PASSWORD@/edtech_csf" -path ./migrations up
```

- Fill in the database credentials in the `Dev` section of **config.json**.
- Run `go run main.go`

## Create Migrations
```
migrate -url "mysql://root:YOUR_MYSQL_ROOT_PASSWORD@/edtech_csf" -path ./migrations create migration_file_xyz
```
## Preprocessing the data
The script ```convert_data.py``` converts the input csv into the proper format for entering into the database.
```
python convert_data.py YOUR_INPUTFILE.csv YOUR_OUTPUTFILE.csv Student/Teacher
```
The Student/Teacher arguemt specifies whether these are Student records or Teacher records under preprocessing.


## Docker usage instructions
- Install [docker](https://docs.docker.com/engine/installation) and [docker-compose](https://docs.docker.com/compose/install).
- Run `cp .env.example .env`. Fill in the *DB_NAME* and *DB_PASS* in *.env*. These are the credentials for the database container.
- Use the same credentials in `Docker` section *config.json* (*DbName* and *DbPassword*) and *docker-entry.sh* (in the `migrate` command).
- Run `docker-compose up`.
- Once the containers are up, you can get shell access by using
```
docker exec -it <CONTAINER_ID> bash
```
