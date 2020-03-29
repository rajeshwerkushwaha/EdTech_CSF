package models

import (
	"github.com/PaiAkshay998/EdTech_CSF/utils"
)

// StudentRecord represents individual record
type StudentRecord struct {
	ID                 uint32 `gorm:"primary_key;AUTO_INCREMENT" json:"id"`
	ContentTitle       string `gorm:"column:content_title;not null" json:"content_title"`
	ContentDescription string `gorm:"column:content_description;not null" json:"content_description"`
	ContentLink        string `gorm:"column:content_link;not null" json:"content_link"`
	StartGrade         uint32 `gorm:"column:startGrade;not null" json:"startGrade"`
	EndGrade           uint32 `gorm:"column:endGrade;not null" json:"endGrade"`
	Subject            string `gorm:"column:subject;not null" json:"subject"`
}

// TableName returns MySQL table name for this model
func (StudentRecord) TableName() string {
	return "StudentRecords"
}

// GetStudentRecords returns records fetched from database
func GetStudentRecords(grade uint32, subject string) ([]*StudentRecord, error) {
	db := utils.GetDB()
	tx := db.Model(&StudentRecord{})
	var studentRecords []*StudentRecord

	if grade != utils.ALLGRADES {
		tx = tx.Where("startGrade <= ? AND endGrade >= ?", grade, grade)
	}
	if subject != "" {
		tx = tx.Where("subject = ?", subject)
	}

	tx.Find(&studentRecords)
	return studentRecords, nil
}
