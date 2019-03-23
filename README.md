# Cern Phoenix Tasks 2019
Tasks for Google Summer of code https://hepsoftwarefoundation.org/gsoc/2019/proposal_Phoenix.html
# Easiest usage
  1. Install [docker desktop](https://www.docker.com/products/docker-desktop)
  2. Run in console:  `docker pull gcr.io/johnbalvin/cern_phoenix_tasks2019`
  3. Run in console:  `docker run -p 8080:8080 gcr.io/johnbalvin/cern_phoenix_tasks2019`
  4. Open your browser and go to: [http://localhost:8080](http://localhost:8080)
  5. Navigate over the items. 
# Easy usage  
  1. Install [go](https://golang.org/dl)
  2. Install [git](https://git-scm.com)
  3. Run in console:  `git clone https://github.com/johnbalvin/CernPhoenixTask2019.git tasks`
  4. Run in console: `cd tasks/backend`
  5. Run in console: `go get -d .`
  6. Run in console: `go build && backend`
  7. Open your browser and go to: [http://localhost:8080](http://localhost:8080)
  8. Navigate over the items. 
  
# Dependencies 

## Backend 
  
  * [gorilla mux](https://github.com/gorilla/mux)
  
## Front end
  
  * [threejs](https://threejs.org/)
  
## Hosting your image

If you want to host your image like gcr.io/johnbalvin/cern_phoenix_tasks2019, you could use [Google Cloud build](https://cloud.google.com/cloud-build/) follow next steps:
   
### Requirements
  * You need the content inside folder `deploy`
  * Create a proyect at [Google Console](https://console.cloud.google.com) and enable billing
  * Intall [Google SDK](https://cloud.google.com/sdk/) and authenticate with your account
  * Change at `deploy/cloudbuild.yaml` this: `gcr.io/johnbalvin/cern_phoenix_tasks2019` for this format: `gcr.io/[projectID]/anyNameYouWant` for your reporsitory created
### Steps  
  1. In the console go to *deploy* folder : `cd tasks/deploy`
  2. Run in console: `gcloud builds submit .`
  3. Your should know have `gcr.io` reporsitory
