const moment = require('moment');
const uuidv4 = require('uuid/v4');
const actions = require('./schedularActions').actions;
let recycleIds = {}

module.exports.getTimeInMilliseconds = function(dueDate) {
    const formatDueDate = moment(dueDate, "M/D/YYYY H:mm")
    const today = moment();
    const diff = formatDueDate.diff(today);

    return moment(diff).valueOf();
};

module.exports.setEmailReminder = function(emails, time, message) {
    if (time > 0) {
        setTimeout(function() {
            emails.forEach(function(email){
                console.log("Send this to email " + email + ": " + message);
            });
        }, time, message, emails);
    }
};

module.exports.setEventReminder = function(emails, time) {
    if (time > 0) {
        setTimeout(function() {
            emails.forEach(function(email){
                console.log("Send reminder to calender: " + email);
            });
        }, time, emails);
    }
};

module.exports.startRecycle = function(interval, action) {
    let intervalId = setInterval(function() {
        actions[action]();
    }, interval);

    const key = uuidv4();
    recycleIds[key] = intervalId;

    return key;
};

module.exports.stopRecycle = function(intervalKey) {
    if (recycleIds[intervalKey]) {
        clearInterval(recycleIds[intervalKey]);
        delete recycleIds[intervalKey];
    }
};