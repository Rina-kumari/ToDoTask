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
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(controller);

app.listen(port, '0.0.0.0', (err)=>{
    if(err) throw err;
    console.log(`Server is running on port: ${port}`);
});