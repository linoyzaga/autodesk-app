const express = require('express');
const router = express.Router();
const timeFunctions = require('./timeFunctions');
router.post('/email_reminder', function (req, res) {
    const emails = req.body.emails;
    const message = req.body.message;
    const timeToSend = req.body.time;

    // Validation
    if (!message || !timeToSend || !emails) {
       return res.status(400).send("Missing params!");
    }

    if (typeof message !== 'string' || typeof timeToSend !== 'string' || ! emails instanceof Array) {
        return res.status(400).send("Invalid params!");
    }

    const time = timeFunctions.getTimeInMilliseconds(timeToSend);

    timeFunctions.setEmailReminder(emails, time, message);

    res.send("OK");
});

router.post('/notification_reminder', function (req, res) {
    const emails = req.body.emails;
    const eventTime = req.body.event_time;
    const notifyTime = req.body.notify_time;

    // Validation
    if (!eventTime || !notifyTime || !emails) {
        return res.status(400).send("Missing params!");
    }

    if (typeof eventTime !== 'string' ||  !Number.isInteger(notifyTime) || ! emails instanceof Array) {
        return res.status(400).send("Invalid params!");
    }

    const time = timeFunctions.getTimeInMilliseconds(eventTime) - notifyTime;

    timeFunctions.setEventReminder(emails, time);

    res.send("OK");
});

router.post('/start_recycle', function (req, res) {
    const interval = req.body.frequency;
    const action = req.body.action;

    // Validation
    if (!interval || !action) {
        return res.status(400).send("Missing params!");
    }

    if ( !Number.isInteger(interval) || typeof action !== 'string') {
        return res.status(400).send("Invalid params!");
    }

    const key = timeFunctions.startRecycle(interval, action);

    res.send(key);
});

router.post('/stop_recycle', function (req, res) {
    const intervalKey = req.body.interval_key;

    // Validation
    if (!intervalKey) {
        return res.status(400).send("Missing params!");
    }

    if (typeof intervalKey !== 'string') {
        return res.status(400).send("Invalid params!");
    }

    timeFunctions.stopRecycle(intervalKey);

    res.send("OK");
});

module.exports = router;