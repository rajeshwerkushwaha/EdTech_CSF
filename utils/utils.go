package utils

// GetConfiguration returns appropriate configuration according to config.json
func GetConfiguration() *Config {
	return TestConfig
}

// Init initializes several components
func Init(config *Config) {
	initLogger(config)
	initDb(config)
}
