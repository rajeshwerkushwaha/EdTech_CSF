package utils

import (
	"encoding/json"
	"fmt"
	"os"
)

// Config contains all necessary settings for server
type Config struct {
	Stage string

	LogFileName string
	LogMaxSize  int
	LogLevel    string

	DbUser     string
	DbPassword string
	DbHost     string
	DbName     string

	ServerPort string
	CacheSize  int
}

var config *Config

// TestConfig is the Config object for testing purposes
var TestConfig = &Config{
	Stage:       "test",
	LogFileName: "stdout",
	LogMaxSize:  50,
	LogLevel:    "debug",
	DbUser:      "root",
	DbPassword:  "root",
	DbHost:      "",
	DbName:      "edtech_csf",
	ServerPort:  ":8000",
	CacheSize:   1000,
}

func init() {
	config = TestConfig

	stage, exists := os.LookupEnv("EDTECH_STAGE")
	if exists && stage == "PROD" {
		configFile, err := os.Open("config.json")
		if err != nil {
			fmt.Println("Error opening config.json")
		}
		defer configFile.Close()
		decoder := json.NewDecoder(configFile)
		err = decoder.Decode(&config)
		if err != nil {
			fmt.Println("Error parsing config file. Please check format")
		}
	}
}

// GetConfiguration returns appropriate configuration according to config.json
func GetConfiguration() *Config {
	return config
}
