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
}

// TableName returns MySQL table name for this model
func (TeacherRecord) TableName() string {
	return "TeacherRecords"
}

// GetTeacherRecords returns records fetched from database
func GetTeacherRecords(useCase string) ([]*TeacherRecord, error) {
	db := utils.GetDB()
	tx := db.Model(&TeacherRecord{})
	var teacherRecords []*TeacherRecord

	if useCase != "" {
		tx = tx.Where("use_case = ?", useCase)
	}

	tx.Find(&teacherRecords)
	return teacherRecords, nil
}
