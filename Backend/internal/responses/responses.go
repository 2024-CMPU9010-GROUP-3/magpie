package responses

import (
	"encoding/json"
	"log"
	"net/http"

	errs "github.com/2024-CMPU9010-GROUP-3/PROJECT/internal/errors"
)

type Response struct {
	HttpStatus int `json:"-"`
	Content    any `json:"content"`
}

type responseDto struct {
	Error    *errs.CustomError `json:"error"`
	Response *Response         `json:"response"`
}

func SendResponse(response Response, w http.ResponseWriter) {
	resp := responseDto{
		Error:    nil,
		Response: &response,
	}
	w.WriteHeader(response.HttpStatus)
	send(resp, w)
}

func SendError(err errs.CustomError, w http.ResponseWriter) {
	resp := responseDto{
		Error:    &err,
		Response: nil,
	}
	log.Printf("Error: %+v\n", err)
	w.WriteHeader(err.HttpStatus)
	send(resp, w)
}

func send(resp responseDto, w http.ResponseWriter) {
	err := json.NewEncoder(w).Encode(resp)
	if err != nil {
		// In this case we cannot send any data to the frontend
		log.Printf("Could not send response: %+v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}
