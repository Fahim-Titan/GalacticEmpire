
'use strict';

const express = require('express');

var PROTO_PATH = __dirname + '/protos/helloworld.proto';

var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
  });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).hello;

var client = new hello_proto.Greeter(target, grpc.credentials.createInsecure());

client.HelloRequest({name: user}, function(err, response) {
  console.log('Greeting:', response.isActive);
});




// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World from service 2');
});

app.get('/service2', (req, res) => {
  res.send('ami service2 bolchi');
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);