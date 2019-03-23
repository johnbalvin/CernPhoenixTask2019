package main

import (
	"bufio"
	"encoding/json"
	"log"
	"math"
	"net/http"
	"os"
	"strconv"
	"strings"
)

var eT = make(map[string][]eventTruth)
var eF = make(map[string][]eventFatras)
var eH = make(map[string]eventHits) //map[hit_id]eventHits

type eventTruth struct {
	HitID      string
	ParticleID string
	Tx         string
	Ty         string
	Tz         string
	Tpx        string
	Tpy        string
	Tpz        string
}

type eventFatras struct {
	ParticleID string
	Vx         string
	Vy         string
	Vz         string
	Px         string
	Py         string
	Pz         string
	Q          string
}
type eventHits struct {
	HitID    string
	X        float32
	Y        float32
	Z        float32
	VolumeID string
	LayerID  string
	ModuleID string
}

func fillData2() {
	f, err := os.OpenFile("../backend/data/event000000000-hits.csv", os.O_RDONLY, os.ModePerm)
	if err != nil {
		log.Fatalf("main -> fillData2:1 -> err: %s", err)
		return
	}
	defer f.Close()

	sc := bufio.NewScanner(f)
	sc.Scan() //no need first line
	for sc.Scan() {
		var evento eventHits
		line := strings.Split(sc.Text(), ",")
		var x, y, z float64
		var err error
		x, err = strconv.ParseFloat(line[1], 32)
		if err != nil {
			log.Fatalf("main -> fillData2:2 -> err: %s", err)
		}
		if math.IsNaN(x) {
			x = -1
		}
		y, err = strconv.ParseFloat(line[2], 32)
		if err != nil {
			log.Fatalf("main -> fillData2:3 -> err: %s", err)
		}

		if math.IsNaN(y) {
			y = -1
		}
		z, err = strconv.ParseFloat(line[3], 32)
		if err != nil {
			log.Fatalf("main -> fillData2:4 -> err: %s", err)
		}

		if math.IsNaN(z) {
			z = -1
		}
		evento.HitID = line[0]
		evento.X = float32(x)
		evento.Y = float32(y)
		evento.Z = float32(z)
		evento.VolumeID = line[4]
		evento.LayerID = line[5]
		evento.ModuleID = line[6]
		eH[evento.HitID] = evento
	}
	if err := sc.Err(); err != nil {
		log.Fatalf("main -> fillData2:5 -> err: %s", err)
		return
	}
}

func task2(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		w.Write(htmlTask2)
	} else if r.Method == "POST" {
		if err := json.NewEncoder(w).Encode(eH); err != nil {
			log.Fatalf("main -> task2:1 err: %s", err)
		}
	}
}
