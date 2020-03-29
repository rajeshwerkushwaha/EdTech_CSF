package handler

import (
	"fmt"
	"net/http"
)

// SearchMaterial returns content after filtering
func SearchMaterial(resp http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(resp, "Hi there")
}
