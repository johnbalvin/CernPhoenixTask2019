package main

import "net/http"

func about(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		w.Write(htmlAbout)
	} else if r.Method == "POST" {

	}
}
