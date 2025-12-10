// constant or module

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
const controller = require('./Controller/controller');


// create nodejs server
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(controller);

app.listen(port, (err)=>{
    if(err) throw err;
    console.log(`server is running on port: ${port}`);
    
})


