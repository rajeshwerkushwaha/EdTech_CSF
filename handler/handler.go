package handler

import (
	"encoding/json"
	"net/http"

	log "github.com/Sirupsen/logrus"

	"github.com/PaiAkshay998/EdTech_CSF/models"
	"github.com/PaiAkshay998/EdTech_CSF/utils"
)

// SearchStudentMaterial returns content after filtering from StudentContent
func SearchStudentMaterial(resp http.ResponseWriter, req *http.Request) {
	keys := req.URL.Query()
	resp.Header().Add("Content-Type", "application/json")
	var grade uint32

	gradeString := keys.Get("grade")
	if gradeString == "" {
		grade = utils.ALLGRADES
	} else {
		gradeVal, err := utils.ParseToUint(gradeString)
		if err != nil {
			utils.Logger.WithFields(log.Fields{
				"gradeString": gradeString,
				"error":       err,
			}).Errorf("Error in parsing gradeString to int")
			resp.WriteHeader(500)
			return
		}
		grade = gradeVal
	}

	subjectArray, _ := keys["subject[]"]

	studentRecords, err := models.GetStudentRecords(grade, subjectArray)
	if err != nil {
		utils.Logger.WithFields(log.Fields{
			"grade":        grade,
			"subjectArray": subjectArray,
			"error":        err,
		}).Errorf("Error in finding student records")
		resp.WriteHeader(500)
		return
	}

	jsonData, err := json.Marshal(studentRecords)
	if err != nil {
		utils.Logger.WithFields(log.Fields{
			"grade":        grade,
			"subjectArray": subjectArray,
			"error":        err,
		}).Errorf("Error in converting student records to json format")
		resp.WriteHeader(500)
		return
	}

	resp.WriteHeader(200)
	resp.Write(jsonData)
}

// SearchTeacherMaterial returns content after filtering from TeacherContent
func SearchTeacherMaterial(resp http.ResponseWriter, req *http.Request) {
	keys := req.URL.Query()
	resp.Header().Add("Content-Type", "application/json")

	useCaseArray, _ := keys["use_case[]"]

	teacherRecords, err := models.GetTeacherRecords(useCaseArray)
	if err != nil {
		utils.Logger.WithFields(log.Fields{
			"useCaseArray": useCaseArray,
			"error":        err,
		}).Errorf("Error in finding student records")
		resp.WriteHeader(500)
		return
	}

	jsonData, err := json.Marshal(teacherRecords)
	if err != nil {
		utils.Logger.WithFields(log.Fields{
			"error": err,
		}).Errorf("Error in converting teacher records to json format")
		resp.WriteHeader(500)
		return
	}

	resp.WriteHeader(200)
	resp.Write(jsonData)
}
