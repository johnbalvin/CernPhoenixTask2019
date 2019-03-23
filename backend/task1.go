package main

import (
	"io/ioutil"
	"log"
	"net/http"
)

func task1(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		w.Write(htmlTask1)
	} else if r.Method == "POST" {
		w.Write(obj)
	}
}
func fillData1() {
	var err error
	obj, err = ioutil.ReadFile("../backend/data/Pix.obj")
	if err != nil {
		log.Fatal("main -> fillData1:1 -> err:", err)
	}
}
