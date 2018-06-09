const mocha = require('mocha');
const supertest = require('supertest');
const assert = require("assert");
const server = supertest.agent("http://localhost:8080");

mocha.describe("GET /status", function(){
    mocha.it("should return json with the services data", function(done){
        var jsonRes = {
            "bim360dm-dev.autodesk.com": "Unavailable",
            "commands.bim360dm-dev.autodesk.com": "Unavailable",
            "my": "OK"
        };

        server
            .get("/health/status")
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.data.should.equal(jsonRes);
                done();
            });
    });
});

mocha.describe("GET /availability/:name", function(){
    mocha.it("should return service percentage", function(done){
        var jsonRes = {
            "my": "1%"
        };

        server
            .post("/health/availability/:my")
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.data.should.equal(jsonRes);
                done();
            });

    });

    mocha.it('should not send reminders with missing params', (done) => {
        server
            .get('/health/availability')
            .expect(400)
            .end(function(err, res){
                assert.equal(res.text, 'Missing params!');
                done();
            })
    });

    mocha.it('should not send reminders with invalid service name', (done) => {
        server
            .get('/health/availability/:my1111')
            .expect(400)
            .end(function(err, res){
                assert.equal(res.text, 'Service does not exist!');
                done();
            })
    });
});