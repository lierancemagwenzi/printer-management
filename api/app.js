const schedule = require('node-schedule');
const fs = require('fs');
const http = require('http');
const cors = require('cors');

const fileUpload = require('express-fileupload');
require('dotenv').config();
const express = require('express');
const path = require('path');
process.env.TZ = "Africa/Harare";
app = express();
bodyParser = require('body-parser');
port = process.env.PORT || 3001;
const morgan = require('morgan');
const short = require('short-uuid');
app.use(morgan('dev'));
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ limit: "50mb",extended: true ,parameterLimit:50000}));
app.use(fileUpload());
// app.use(cors());

app.use(
    cors ({
        origin: "*",

    })
);

let  printerRoutes=require('./routes/printerRoutes')
printerRoutes(app);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
const httpServer = http.createServer(app);
httpServer.listen(port);
