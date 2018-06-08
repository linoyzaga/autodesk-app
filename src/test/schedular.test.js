const mocha = require('mocha');
const sinon = require('sinon');
const assert = require("assert");
const timeFunctions = require('../server/scheduler/timeFunctions')

let clock;
let result;

mocha.describe('email reminder', () => {
    mocha.beforeEach(function() {
        clock = sinon.useFakeTimers();
        result = sinon.stub(console, 'log');
    });

    mocha.afterEach(function() {
        clock.restore();
        result.restore();
    });

    mocha.describe('email reminder', () => {
        mocha.it('should print reminder to screen after 2 seconds', function(done) {
            const emails = ["linoy@gmail.com"];
            const message = 'Its working';
            const time = 2000;

            timeFunctions.setEmailReminder(emails, time, message);
            clock.tick(2020)
            sinon.assert.calledOnce(result);

            done();
        });
    });
});

mocha.describe('event reminder', () => {
    mocha.beforeEach(function() {
        clock = sinon.useFakeTimers();
        result = sinon.stub(console, 'log');
    });

    mocha.afterEach(function() {
        clock.restore();
        result.restore();
    });

    mocha.describe('event reminder', () => {
        mocha.it('should print event reminder to screen after 5 seconds', function(done) {
            const emails = ["linoy@gmail.com", "haim@gmail.com"];
            const time = 5000;

            timeFunctions.setEventReminder(emails, time);
            clock.tick(5020)
            sinon.assert.calledTwice(result);

            done();
        });
    });
});

mocha.describe('start recycle', () => {
    mocha.beforeEach(function() {
        clock = sinon.useFakeTimers();
        result = sinon.stub(console, 'log');
    });

    mocha.afterEach(function() {
        clock.restore();
        result.restore();
    });

    mocha.describe('start recycle', () => {
        mocha.it('should print recycle event to screen every 1 second', function(done) {
            const interval = 1000;
            const action = 'load_data';

            timeFunctions.startRecycle(interval, action);
            clock.tick(2020);
            sinon.assert.calledTwice(result);

            done();
        });
    });
});