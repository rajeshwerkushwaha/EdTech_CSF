package models

import (
	"github.com/PaiAkshay998/EdTech_CSF/utils"
)

// TeacherRecord represents individual record
type TeacherRecord struct {
	ID                 uint32 `gorm:"primary_key;AUTO_INCREMENT" json:"id"`
	ContentTitle       string `gorm:"column:content_title;not null" json:"content_title"`
	ContentDescription string `gorm:"column:content_description;not null" json:"content_description"`
	ContentLink        string `gorm:"column:content_link;not null" json:"content_link"`
	UseCase            string `gorm:"column:use_case;not null" json:"use_case"`
	Cost               string `gorm:"column:cost;not null" json:"cost"`
	Device             uint32 `gorm:"column:device;not null" json:"device"`
}

// TableName returns MySQL table name for this model
func (TeacherRecord) TableName() string {
	return "TeacherRecords"
}

// GetTeacherRecords returns records fetched from database
func GetTeacherRecords(useCaseArray []string, device uint32, cost uint32) ([]*TeacherRecord, error) {
	db := utils.GetDB()
	tx := db.Model(&TeacherRecord{})
	var teacherRecords []*TeacherRecord

	if len(useCaseArray) != 0 {
		tx = tx.Where("use_case in (?)", useCaseArray)
	}

	if device != utils.ALLDEVICES {
		tx = tx.Where("device = ?", device)
	}

	if cost != utils.ALLCOSTS {
		freeCostString := utils.FREECOST;
		costString := utils.ParseToString(cost)
		if freeCostString == costString {
			tx = tx.Where("cost = ?",freeCostString)
		} else {
			tx = tx.Where("cost <> ?",freeCostString)
		}
	}

	tx.Find(&teacherRecords)
	return teacherRecords, nil
}
