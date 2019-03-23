package main

import (
	"io/ioutil"
	"log"
)

var htmlTask1, htmlTask2, htmlAbout, htmlIndex, obj []byte

func init() {
	var err error
	htmlTask1, err = ioutil.ReadFile("../frontend/task1.html")
	if err != nil {
		log.Fatal("main -> init:1 -> err:", err)
	}
	htmlTask2, err = ioutil.ReadFile("../frontend/task2.html")
	if err != nil {
		log.Fatal("main -> init:2 -> err:", err)
	}

	htmlAbout, err = ioutil.ReadFile("../frontend/about.html")
	if err != nil {
		log.Fatal("main -> init:3 -> err:", err)
	}
	htmlIndex, err = ioutil.ReadFile("../frontend/index.html")
	if err != nil {
		log.Fatal("main -> init:4 -> err:", err)
	}

	fillData1()
	fillData2()
}
