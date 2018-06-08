const express = require('express');
const router = express.Router();
const services = require('./consts').services;
const goodResults = require('./consts').goodResults;
const request = require('request');
const parser = require('xml2json');

router.get('/status', function (req, res) {
    var result = {};

    const promises = services.map(service => new Promise(function(resolve, reject) {
            request.get(service, function (err,res, body) {
                if (err) { return reject(err); }
                resolve([res, body]);
            })
        })
    );

    Promise.all(promises).then(data => {
        data.forEach(function(item){
            switch(item[0].headers["content-type"]) {
                case 'text/xml; charset=utf-8':
                    var parsedResult = JSON.parse(parser.toJson(item[1]));
                    var serviceName = parsedResult.HealthCheck["service"];
                    var status = parsedResult.HealthCheck["status"];
                    var res = goodResults.includes(status) ? "OK" : "BAD";

                    result[serviceName] = res;
                    break;
                case 'application/json; charset=utf-8':
                    var parsedResult = JSON.parse(item[1]);
                    var status = parsedResult.status["overall"];
                    var serviceName = parsedResult.service;
                    var res = goodResults.includes(status) ? "OK" : "BAD"

                    result[serviceName] = res;
                    break;
            }
        })

        res.status(200).send(result);
    });
});

router.get('/availability', function (req, res) {

    res.send("OK");
});

// async function checkServices() {
//   var result = [];

//   for (var url in services) {
//         var response = await requestService(url);
//         var paresdResponse = response;
//         result.push(paresdResponse);
//     };

//     return result;
  
// };

// function requestService(url) {
//     request(url, function (error, response) {
//         if(error) {
//             return "error";
//         }   

//       return response;
//     });
// };

module.exports = router;