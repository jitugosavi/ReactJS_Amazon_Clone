const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('');

// API

// App config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get('/', (_request, response) => response.status(200).send('Welcome to React'));

// Listen command
exports.api = functions.runWith({memory: '2GB', timeoutSeconds: '360'}).https.onRequest(app);

// Example end point
// http://localhost:5001/clone-1463c/us-central1/api