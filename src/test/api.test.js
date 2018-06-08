const mocha = require('mocha');
const supertest = require('supertest');
const assert = require("assert");
const server = supertest.agent("http://localhost:8080");

mocha.describe("POST /email_reminder", function(){
    mocha.it("should send emails with a specific message", function(done){
        const emails = ["linoy@gmail.com", "haim@gmail.com"];
        const message = 'Its working';
        const time = '05/05/2018 12:00';

        server
            .post("/scheduler/email_reminder")
            .send({emails, message, time})
            .expect(200, done);
    });

    mocha.it('should not send emails with missing params', (done) => {
        const emails = ["linoy@gmail.com"];
        const message = 'Its not working';

        server
            .post('/scheduler/email_reminder')
            .send({emails, message})
            .expect(400)
            .end(function(err, res){
                assert.equal(res.text, 'Missing params!');
                done();
            })
    });

    mocha.it('should not send emails with invalid params', (done) => {
        const emails = ["linoy@gmail.com"];
        const message = 123;
        const time = '05/05/2018 12:00';

        server
            .post('/scheduler/email_reminder')
            .send({emails, message, time})
            .expect(400)
            .end(function(err, res){
                assert.equal(res.text, 'Invalid params!');
                done();
            })
    });
});

mocha.describe("POST /notification_reminder", function(){
    mocha.it("should send reminder to calenders", function(done){
        const emails = ["linoy@gmail.com", "haim@gmail.com"];
        const event_time = '05/05/2018 12:00';
        const notify_time = 50000;

        server
            .post("/scheduler/notification_reminder")
            .send({emails, event_time, notify_time})
            .expect(200, done);
    });

    mocha.it('should not send reminders with missing params', (done) => {
        const emails = ["linoy@gmail.com"];
        const notify_time = 50000;

        server
            .post('/scheduler/notification_reminder')
            .send({emails, notify_time})
            .expect(400)
            .end(function(err, res){
                assert.equal(res.text, 'Missing params!');
                done();
            })
    });

    mocha.it('should not send reminders with invalid params', (done) => {
        const emails = ["linoy@gmail.com"];
        const event_time = 123;
        const notify_time = '50000';

        server
            .post('/scheduler/notification_reminder')
            .send({emails, notify_time, event_time})
            .expect(400)
            .end(function(err, res){
                assert.equal(res.text, 'Invalid params!');
                done();
            })
    });
});

mocha.describe("POST /start_recycle", function(){
    mocha.it("should start recycle interval", function(done){
        const frequency = 2000;
        const action = 'load_data';

        server
            .post("/scheduler/start_recycle")
            .send({frequency, action})
            .expect(200,done);
    });

    mocha.it('should not start recycle interval with missing params', (done) => {
        const frequency = 2000;

        server
            .post('/scheduler/start_recycle')
            .send({frequency})
            .expect(400)
            .end(function(err, res){
                assert.equal(res.text, 'Missing params!');
                done();
            })
    });

    mocha.it('should not start recycle interval with invalid params', (done) => {
        const action = 'load_data';
        const frequency = '20000';

        server
            .post('/scheduler/start_recycle')
            .send({action, frequency})
            .expect(400)
            .end(function(err, res){
                assert.equal(res.text, 'Invalid params!');
                done();
            })
    });
});

mocha.describe("POST /stop_recycle", function(){
    mocha.it("should stop a specific recycle", function(done){
        const interval_key = '17cc8812-62c7-4bb2-b5dd-068ad2cd4652';

        server
            .post("/scheduler/stop_recycle")
            .send({interval_key})
            .expect(200,done);
    });

    mocha.it('should not stop recycle interval', (done) => {

        server
            .post('/scheduler/stop_recycle')
            .expect(400)
            .end(function(err, res){
                assert.equal(res.text, 'Missing params!');
                done();
            })
    });

    mocha.it('should not stop recycle interval', (done) => {
        const interval_key = 12346;

        server
            .post('/scheduler/stop_recycle')
            .send({interval_key})
            .expect(400)
            .end(function(err, res){
                assert.equal(res.text, 'Invalid params!');
                done();
            })
    });
});