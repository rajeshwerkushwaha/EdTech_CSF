package utils

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql" // driver
)

var dbConfig *Config

// db is the only connection that is open and gets reused
var db *gorm.DB

// GetDB returns a database connection object by opening one based
// on the configuration
func GetDB() *gorm.DB {
	return db
}

// CloseDB closes the db connection
func CloseDB() error {
	return db.Close()
}

func initDb(config *Config) {
	dbConfig = config

	user := dbConfig.DbUser
	pwd := dbConfig.DbPassword
	host := dbConfig.DbHost
	dbname := dbConfig.DbName

	connstr := fmt.Sprintf("%s:%s@%s/%s?charset=utf8&parseTime=true", user, pwd, host, dbname)

	var err error
	db, err = gorm.Open("mysql", connstr)
	if err != nil {
		panic(fmt.Errorf("Error opening DB. Got error: %+v", err))
	}
}
