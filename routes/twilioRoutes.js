//Twilio setup
const accountSid = process.env.twilioAccountSID;
const authToken = process.env.twilioAuthToken;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const http = require('http');
const db = require("../models");


module.exports = app => {


    app.get("/api/twilio/sendTestMessage", (req, res) => {
        client.messages
            .create({
                body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
                from: '+16193044042',
                to: '+13165126503'
            })
            .then(message => {
                res.json(message);
            })
            .catch(err => res.json(err));
    })


    app.post("/api/twilio/sms", (req, res) => {
        //Check to see if an unfinished text exists with that incoming number.

            //if it doesn't then create a new text. Search for the locations matching the number the text was sent to

            //if it does, find what step we are at
    });


}