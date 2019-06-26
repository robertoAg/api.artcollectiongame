let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

Artist = require('./model/artist');
Artwork = require('./model/artwork');

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', function (err) {
 
    if (err) throw err;
  
    console.log('MongoDB Successfully connected');
  
});
var db = mongoose.connection;

// Setup server port
var port = process.env.PORT || 8080;

// Import routes
let apiRoutes = require("./api-routes/api-routes");

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});