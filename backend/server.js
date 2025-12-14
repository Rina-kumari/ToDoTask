// Load environment variables from .env file
require('dotenv').config();

// constant or module
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const controller = require('./Controller/controller');

// create nodejs server
/*app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));*/

app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://to-do-task-vert.vercel.app',  // ← Your Vercel URL
    'https://*.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(controller);

app.use((err, req, res, next) => {
    console.error('Express error:', err);
    res.status(500).json({ error: err.message });
});

// Add 404 handler
app.use((req, res) => {
    console.log('404 - Route not found:', req.path);
    res.status(404).json({ error: 'Route not found' });
});

app.listen(port, (err) => {  
    if(err) {
        console.error('Server failed to start:', err);
        throw err;
    }
    console.log(`Server is running on port: ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});