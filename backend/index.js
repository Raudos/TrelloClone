const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const http = require('http');
const socket = require("socket.io");

// DB
const { mongoose } = require('./db/mongoose');

// Router
const InitialiseRouter = require('./router/index');

// Setup
const app = express();
const server = http.Server(app);
global.io = socket(server);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialise Routes
InitialiseRouter(app);

server.listen(3000, () => {});

module.exports = { server };
