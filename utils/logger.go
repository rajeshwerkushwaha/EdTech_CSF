package utils

import (
	"os"

	"github.com/Sirupsen/logrus"
	"gopkg.in/natefinch/lumberjack.v2"
)

// Logger is a global instance used everywhere for logging purposes
var Logger *logrus.Logger

func initLogger(config *Config) {
	fileName := config.LogFileName
	maxSize := config.LogMaxSize
	logLevel := config.LogLevel

	level, err := logrus.ParseLevel(logLevel)
	if err != nil {
		panic(err)
	}

	Logger = &logrus.Logger{
		Formatter: &logrus.JSONFormatter{},
		Out: &lumberjack.Logger{
			Filename: fileName,
			MaxSize:  maxSize, // MB
		},
		Level: level,
	}

	if fileName == "stdout" {
		Logger.Out = os.Stdout
		Logger.Formatter = &logrus.TextFormatter{}
	}
}
