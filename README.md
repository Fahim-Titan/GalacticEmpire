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

#### Adding NGINX
- To add NGINX, we will create another container.
- the setup is fairly simple.
- Create a new folder called 'nginx'
- create a dockerfile in there and paste this code 
```
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 8888
```
- In here we used the nginx container which comes with nginx installed 
- In nginx all the configurations are stored in the conf.d folder. All we had to do is store our configuration file in that folder.
- There is already a file called default.conf which we removed and pasted our file that is called nginx.conf
- the nginx.conf file holds this code below
```nginx
server {
    listen 8888;
    server_name localhost;

    location / {
        proxy_pass http://service4:8080/;
        proxy_redirect    default;
        proxy_set_header  Host $host;
        proxy_set_header  X-Real-IP $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header  X-Forwarded-Host $server_name;
    }

    location /service2/ {
        proxy_pass http://service2:8081/;
        proxy_redirect    default;
        proxy_set_header  Host $host;
        proxy_set_header  X-Real-IP $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header  X-Forwarded-Host $server_name;
    }
    
    location /service3/ {
        proxy_pass http://service3:8080/;
        proxy_redirect    default;
        proxy_set_header  Host $host;
        proxy_set_header  X-Real-IP $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header  X-Forwarded-Host $server_name;
    }

    location /service4/ {
        proxy_pass http://service4:8080/;
        proxy_redirect    default;
        proxy_set_header  Host $host;
        proxy_set_header  X-Real-IP $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header  X-Forwarded-Host $server_name;
    }

    location /service5/ {
        proxy_pass http://service5:8080/;
        proxy_redirect    default;
        proxy_set_header  Host $host;
        proxy_set_header  X-Real-IP $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header  X-Forwarded-Host $server_name;
    }
}
```
- *Some Notes Below*
    - We can create multiple Nginx server by using the server block. But we chose to use only one nginx server.
    - the keyword `listen` means that the server will be reachable through that port.
    - Not sure about the server_name significanse
    - the `location` is the main part of the nginx conf right now.
    - whenever the nginx server gets a request it tries to match the URL with this location.
    - the location is actually a regex (need to verify!)
    - So after it matches the URL and if matched it proxy pass that request
    - The reason we are proxy calling the service using their name ('service1:8080', 'service2:8080') instead of localhost is because, docker puts each container in their own environment and each of the environment can be accesseble from another through their own network. Docker by default make their network discoverable.
    - **NOTE:** *Make sure to add a trailing slash (/) at the end of each location. Otherwise it will not remove the matching part while proxy forwarding.*
    