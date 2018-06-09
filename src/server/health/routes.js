const express = require('express');
const request = require('request');
const parser = require('xml2json');
const router = express.Router();
const consts = require('./consts');
const availabilityServices = require('./availabilityHashes').availabilityServices;

router.get('/status', function (req, res) {
    var result = {};

    const promises = consts.urls.map(service => new Promise(function(resolve, reject) {
            request.get(service, function (err, res, body) {
                if (err) { return reject(err); }
                resolve([res, body]);
            })
        })
    );

    Promise.all(promises).then(data => {
        data.forEach(function(item) {
            item[0].statusCode !== 200 ?
                buildBadResult(item, result) : buildGoodResult(item, result);
        })

        res.status(200).json(result);
    });
});

router.get('/availability/:name', function (req, res) {
    var serviceName = req.params.name;
    var result = {};

    if (!consts.servicesNames.includes(serviceName)) {
        return res.status(400).send("Service does not exist!");
    }

    var percentage = calcPercentage(serviceName);
    result[serviceName] = percentage + "%";

    res.status(200).json(result);
});

function buildGoodResult(item, result) {
    var type = item[0].headers["content-type"];
    var status;
    var serviceName;
    var parsedResult;

    switch(type) {
        case consts.contentTypes["xml"]:
            parsedResult = JSON.parse(parser.toJson(item[1]));
            serviceName = parsedResult.HealthCheck["service"];
            status = parsedResult.HealthCheck["status"] || "BAD";

            break;
        case consts.contentTypes["json"]:
            parsedResult = JSON.parse(item[1]);
            serviceName = parsedResult.service;
            status = parsedResult.status["overall"] || "BAD";

            break;
    }

    result[serviceName] = consts.goodResults.includes(status) ? "OK" : "BAD";
};

function buildBadResult(item, result) {
    var serviceName = item[0].client.servername;

    result[serviceName] = "Unavailable"
};

function calcPercentage(name){
    var sum = 0;

    Object.keys(availabilityServices[name]).forEach(function (key) {
       if (availabilityServices[name][key] === "1") { sum++ };
    });

    return parseInt(sum / 60 * 100);
};

module.exports = router;