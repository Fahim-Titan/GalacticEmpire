# Introduction

This project is made solely to show how to create a microservice project from scratch. Along with that it will also demonstrate how to integrate multiple services and how they should communicate. For the sake of simplecity the services are made using NodeJS. Each of the feature addition will be seperated by commit (I know this is not the correct approach. Each feature should be done in it's own feature branch, but for now we will devide each of the feature addition by Commit)

# Prerequisites

Since this project was build using windows 10 Pro, I will be adding commands and instructions that worked on my machine. Also since we will be using Docker to handle the microservice, it should work any machine if the docker is successfully installed.

# Steps
### Creating a single nodeJS project and deploy using docker
- Create a nodeJS project
- Install expressJS
- Write the server.js file (*paste the below code segment*). Open a port. 
```js
'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```
- Create dockerfile and a dockerignore file
- Build the docker image.
    - Run this command to build the image -> `docker build -t node-service-1 ./service1`
- Run the Image
    - Run this cmd -> `docker run node-service-1`
- *Follow the same process to build 4 more services*


### Creating docker compose file to build and run multiple services

- Go to the root directory.
- Create a file called `docker-compose.yml`
- write down this code
```yml
version: "3.9"
services:
  service1:
    build: ./service1
    ports: 
      - "42410:8080"
  service2:
    build: ./service2
    ports: 
      - "42420:8080"
  service3:
    build: ./service3
    ports: 
      - "42430:8080"
  service4:
    build: ./service4
    ports:
      - "42440:8080"
  service5:
    build: ./service5
    ports: 
      - "42450:8080"
```
- make sure the folder names are correct.
- Now run in the cmd to build the docker image altogether -> `docker-compose build`
- This should build the container image nicely.
- Run the cmd to run the docker images -> `docker compose up`