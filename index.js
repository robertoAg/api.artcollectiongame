let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

Artist = require('./model/artistModel');
Artwork = require('./model/artworkModel');

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
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});