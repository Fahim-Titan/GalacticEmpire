
'use strict';

const express = require('express');


var PROTO_PATH = __dirname + '/protos/hello.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).hello;


function GetStatusReport(call, callback) {
  callback(null, {isActive: 'Hello ' + call.request.name});
}
var server = new grpc.Server();
server.addService(hello_proto.StatusReport.service, {GetStatusReport: GetStatusReport});
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('GRPC Server Started');
});

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