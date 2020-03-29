package utils

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
