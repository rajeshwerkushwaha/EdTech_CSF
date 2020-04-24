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
	language := "en"

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
	mediumArray, _ := keys["medium[]"]
	languageVal := keys.Get("language")
	languageResult, _ := utils.CheckLanguage(languageVal)
	if(languageResult) {
		language = languageVal
	}

	studentRecords, err := models.GetStudentRecords(grade, subjectArray, mediumArray, language)
	if err != nil {
		utils.Logger.WithFields(log.Fields{
			"grade":        grade,
			"subjectArray": subjectArray,
			"language":     language,
			"medium":       mediumArray,
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
			"medium":       mediumArray,
			"language":     language,
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

	language := "en"

	useCaseArray, _ := keys["use_case[]"]
	mediumArray, _ := keys["medium[]"]
	languageVal := keys.Get("language")
	languageResult, _ := utils.CheckLanguage(languageVal)
	if(languageResult) {
		language = languageVal
	}

	teacherRecords, err := models.GetTeacherRecords(useCaseArray, mediumArray, language)
	if err != nil {
		utils.Logger.WithFields(log.Fields{
			"useCaseArray": useCaseArray,
			"medium":       mediumArray,
			"language":     language,
			"error":        err,
		}).Errorf("Error in finding student records")
		resp.WriteHeader(500)
		return
	}

	jsonData, err := json.Marshal(teacherRecords)
	if err != nil {
		utils.Logger.WithFields(log.Fields{
			"useCaseArray": useCaseArray,
			"medium":       mediumArray,
			"language":     language,
			"error":        err,
		}).Errorf("Error in converting teacher records to json format")
		resp.WriteHeader(500)
		return
	}

	resp.WriteHeader(200)
	resp.Write(jsonData)
}
