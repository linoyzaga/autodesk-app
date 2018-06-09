var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./src/server/routes');
var intervalFunctions = require('./src/server/intervalFunctions');

var PORT = process.env.PORT || 8080;
app.use(bodyParser.json());

routes(app);

app.listen(PORT, function() {
    console.log('Server running on ' + PORT);
});

setInterval(function() { intervalFunctions.intervalCheck() }, 60000);