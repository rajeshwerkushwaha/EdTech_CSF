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
      utils.Logger.Errorf("Error in parsing grade to string : %s",err)
			resp.WriteHeader(500)
			return
		}
		grade = gradeVal
	}

	subjectArray, _ := keys["subject[]"]

	studentRecords, err := models.GetStudentRecords(grade, subjectArray)
	if err != nil {
		utils.Logger.Errorf("Error in finding student records : %s",err)
		resp.WriteHeader(500)
		return
	}

	jsonData, err := json.Marshal(studentRecords)
	if err != nil {
		utils.Logger.Errorf("Error in converting student records to json format : %s",err)
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
		utils.Logger.Errorf("Error in finding teacher records : %s",err)
		resp.WriteHeader(500)
		return
	}

	jsonData, err := json.Marshal(teacherRecords)
	if err != nil {
		utils.Logger.Errorf("Error in converting records to json format : %s",err)
		resp.WriteHeader(500)
		return
	}

	resp.WriteHeader(200)
	resp.Write(jsonData)
}
