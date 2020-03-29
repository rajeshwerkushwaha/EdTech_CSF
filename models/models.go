package models

// StudentRecord represents individual record
type StudentRecord struct {
	ID                 uint32 `gorm:"primary_key;AUTO_INCREMENT" json:"id"`
	ContentTitle       string `gorm:"column:content_title;not null" json:"content_title"`
	ContentDescription string `gorm:"column:content_description;not null" json:"content_description"`
	ContentLink        string `gorm:"column:content_link;not null" json:"content_link"`
	Grade              uint32 `gorm:"column:grade;not null" json:"grade"`
	Subject            string `gorm:"column:subject;not null" json:"subject"`
}

// TableName returns MySQL table name for this model
func (StudentRecord) TableName() string {
	return "StudentRecords"
}

// GetStudentRecords returns records fetched from database
func GetStudentRecords(grade uint32, subject string) ([]*StudentRecord, error) {
	return nil, nil
}
