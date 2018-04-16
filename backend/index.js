const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

// DB
const { mongoose } = require('./db/mongoose');

// Router
const InitialiseRouter = require('./router/index');

// Setup
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialise Routes
InitialiseRouter(app);

app.listen(3000, () => {});

module.exports = { app };
