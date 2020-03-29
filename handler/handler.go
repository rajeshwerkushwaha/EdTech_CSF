package handler

import (
	"encoding/json"
	"net/http"

	"github.com/PaiAkshay998/EdTech_CSF/models"
	"github.com/PaiAkshay998/EdTech_CSF/utils"
)

// SearchMaterial returns content after filtering
func SearchMaterial(resp http.ResponseWriter, req *http.Request) {
	keys := req.URL.Query()
	resp.Header().Add("Content-Type", "application/json")
	var grade uint32

	if keys.Get("is_student") == "1" {
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

		subject := keys.Get("subject")

		studentRecords, err := models.GetStudentRecords(grade, subject)
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
	} else {
	}

}
