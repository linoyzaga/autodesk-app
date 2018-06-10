const request = require('request');
const availabilityServices = require('./health/availabilityHashes').availabilityServices;

function intervalCheck() {
    const host = "http://localhost:8080/health/status";

    request.get(host, function (err, res, body) {
        var parsedBody = JSON.parse(body);
        var today = new Date();
        var min = today.getMinutes();

        Object.keys(parsedBody).forEach(function (key) {
            availabilityServices[key][min] = parsedBody[key] === 'OK' ? "1" : null;
        });
    });
};

module.exports.intervalCheck = intervalCheck;