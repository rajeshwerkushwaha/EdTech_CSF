package utils

import "strconv"

const (
	// ALLGRADES represents the Grade if all grades are to be selected
	ALLGRADES = uint32(13)
	// TESTGRADES represents the Grade if only the "Test" is to be selected
	TESTGRADES = uint32(14)
	//READINGGRADE represents the Grade if only "Speaking/Reading" is to be selected
	READINGGRADE = uint32(15)
)

// Init initializes several components
func Init(config *Config) {
	initLogger(config)
	initDb(config)
}

// ParseToUint takes a string and returns its uint32 equivalent
func ParseToUint(stringNumber string) (uint32, error) {
	number, err := strconv.Atoi(stringNumber)
	if err != nil {
		return 0, err
	}
	return uint32(number), nil
}
