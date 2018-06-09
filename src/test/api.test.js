const mocha = require('mocha');
const supertest = require('supertest');
const server = supertest.agent("http://localhost:8080");
const assert = require("assert");

mocha.describe("GET /status", function() {
    mocha.it("should return json with the services data", function(done){
        var jsonRes = {
            "bim360-dm": "OK",
            "Command Processor": "OK",
            "my": "OK"
        };

        server
            .get("/health/status")
            .expect(200)
            .end(function(err, res) {
                assert.equal(JSON.stringify(res.body), JSON.stringify(jsonRes))
                done();
            });
    });
});

mocha.describe("GET /availability/:name", function(){
    mocha.it("should return service percentage", function(done){
        var jsonRes = {
            "my": "0%"
        };

        server
            .get("/health/availability/my")
            .expect(200)
            .end(function(err, res) {
                assert.equal(JSON.stringify(res.body), JSON.stringify(jsonRes))
                done();
            });

    });

    mocha.it('should not work with invalid service name', (done) => {
        server
            .get('/health/availability/:my1111')
            .expect(400)
            .end(function(err, res){
                assert.equal(res.text, 'Service does not exist!');
                done();
            })
    });
});