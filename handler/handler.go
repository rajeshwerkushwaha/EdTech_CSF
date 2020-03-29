package handler

import (
	"encoding/json"
	"net/http"

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
			resp.WriteHeader(500)
			return
		}
		grade = gradeVal
	}

	subjectArray, _ := keys["subject[]"]

	studentRecords, err := models.GetStudentRecords(grade, subjectArray)
	if err != nil {
		resp.WriteHeader(500)
		return
	}

	jsonData, err := json.Marshal(studentRecords)
	if err != nil {
		resp.WriteHeader(500)
		return
	}

	resp.WriteHeader(200)
	resp.Write(jsonData)
}

// SearchTeacherMaterial returns content after filtering from TeacherContent
func SearchTeacherMaterial(resp http.ResponseWriter, req *http.Request) {

}
