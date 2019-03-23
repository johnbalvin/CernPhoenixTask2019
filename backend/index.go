package main

import "net/http"

func index(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		w.Write(htmlIndex)
	} else if r.Method == "POST" {

	}
}
