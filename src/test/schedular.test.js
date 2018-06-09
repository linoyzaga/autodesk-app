const mocha = require('mocha');
const sinon = require('sinon');
const assert = require("assert");
const intervalFunctions = require('../server/intervalFunctions')

let clock;
let mockHash;

mocha.describe('interval', () => {
    mocha.beforeEach(function() {
        clock = sinon.useFakeTimers();
        mockHash = sinon.mock(obj);
    });

    mocha.afterEach(function() {
        clock.restore();
        mockHash.restore();
    });

    mocha.describe('interval health check', () => {
        mocha.it('should update the availability hashes every 1 minute', function(done) {
            const interval = 6000;

            intervalFunctions.intervalCheck();
            clock.tick(6020);
            sinon.assert.calledTwice(mockHash);

            done();
        });
    });
});