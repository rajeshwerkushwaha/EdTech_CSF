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
	var device uint32
	var cost uint32

	gradeString := keys.Get("grade")
	if gradeString == "" {
		grade = utils.ALLGRADES
	} else {
		gradeVal, err := utils.ParseToUint(gradeString)
		if err != nil {
      utils.Logger.WithFields(log.Fields{
				"gradeString": gradeString,
				"error": err,
				}).Errorf("Error in parsing gradeString to int")
			resp.WriteHeader(500)
			return
		}
		grade = gradeVal
	}

	subjectArray, _ := keys["subject[]"]

	deviceString := keys.Get("device")
	if deviceString == "" {
		device = utils.ALLDEVICES
	} else {
		deviceVal, err := utils.ParseToUint(deviceString)
		if err != nil {
      utils.Logger.WithFields(log.Fields{
				"deviceString": deviceString,
				"error": err,
				}).Errorf("Error in parsing deviceString to int")
			resp.WriteHeader(500)
			return
		}
		device = deviceVal
	}

	costString := keys.Get("cost")
	if costString == "" {
		cost = utils.ALLCOSTS
	} else {
		costVal, err := utils.ParseToUint(costString)
		if err != nil {
      utils.Logger.WithFields(log.Fields{
				"costString": costString,
				"error": err,
				}).Errorf("Error in parsing costString to int")
			resp.WriteHeader(500)
			return
		}
		cost = costVal
	}

	studentRecords, err := models.GetStudentRecords(grade, subjectArray, device,cost)
	if err != nil {
		utils.Logger.WithFields(log.Fields{
			"grade"       : grade,
			"subjectArray": subjectArray,
			"device"      :device,
			"cost"        :cost,
			"error"       : err,
			}).Errorf("Error in finding student records")
		resp.WriteHeader(500)
		return
	}

	jsonData, err := json.Marshal(studentRecords)
	if err != nil {
		utils.Logger.WithFields(log.Fields{
			"grade"       : grade,
			"subjectArray": subjectArray,
			"device"      :device,
			"cost"        :cost,
			"error"       : err,
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
	var device uint32
	var cost uint32

	useCaseArray, _ := keys["use_case[]"]

	deviceString := keys.Get("device")
	if deviceString == "" {
		device = utils.ALLDEVICES
	} else {
		deviceVal, err := utils.ParseToUint(deviceString)
		if err != nil {
      utils.Logger.WithFields(log.Fields{
				"deviceString": deviceString,
				"error": err,
				}).Errorf("Error in parsing deviceString to int")
			resp.WriteHeader(500)
			return
		}
		device = deviceVal
	}

	costString := keys.Get("cost")
	if costString == "" {
		cost = utils.ALLCOSTS
	} else {
		costVal, err := utils.ParseToUint(costString)
		if err != nil {
      utils.Logger.WithFields(log.Fields{
				"costString": costString,
				"error": err,
				}).Errorf("Error in parsing costString to int")
			resp.WriteHeader(500)
			return
		}
		cost = costVal
	}

	teacherRecords, err := models.GetTeacherRecords(useCaseArray,device,cost)
	if err != nil {
		utils.Logger.WithFields(log.Fields{
			"useCaseArray": useCaseArray,
			"device"      :device,
			"cost"        :cost,
			"error"       :err,
			}).Errorf("Error in finding student records")
		resp.WriteHeader(500)
		return
	}

	jsonData, err := json.Marshal(teacherRecords)
	if err != nil {
		utils.Logger.WithFields(log.Fields{
			"useCaseArray": useCaseArray,
			"device"      :device,
			"cost"        :cost,
			"error"       : err,
			}).Errorf("Error in converting teacher records to json format")
		resp.WriteHeader(500)
		return
	}

	resp.WriteHeader(200)
	resp.Write(jsonData)
}
