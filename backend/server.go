package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	registerHandlers(r)
	srv := &http.Server{
		Addr:         ":8080",
		Handler:      r,
		ReadTimeout:  time.Minute,
		WriteTimeout: time.Minute,
		IdleTimeout:  time.Minute,
	}
	fmt.Println("--- Server is running --")
	if err := srv.ListenAndServe(); err != nil {
		// Error starting or closing listener:
		log.Printf("HTTP server ListenAndServe: %v", err)
	}
}

func registerHandlers(r *mux.Router) {
	r.HandleFunc("/", index)
	r.HandleFunc("/Task1", task1)
	r.HandleFunc("/Task2", task2)
	r.HandleFunc("/About", about)
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("../frontend/static"))))
}
