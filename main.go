package main

import (
	"log"
	"net/http"

	"github.com/PaiAkshay998/EdTech_CSF/handler"
	"github.com/PaiAkshay998/EdTech_CSF/utils"
)

func main() {
	config := utils.GetConfiguration()
	utils.Init(config)
	http.HandleFunc("/searchMaterial", handler.SearchMaterial)
	log.Fatal(http.ListenAndServe(config.ServerPort, nil))
}
