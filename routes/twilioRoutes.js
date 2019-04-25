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
        console.log(req.body);

        //Search for existing customer by incoming telephone number
        db.Customer
            .findOne({telephone: req.body.From})
            .then(dbCustomer => {
                console.log(dbCustomer);
                //Check if the record exists
                if (dbCustomer) {
                    //Respond
                }
                else {
                    //Add customer if they don't exist
                    db.Customer
                        .create({telephone: req.body.From,})
                        .then(dbCustomer => {
                            console.log(dbCustomer);
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err));

        const twiml = new MessagingResponse();
        twiml.message('The Robots are coming! Head for the hills!');
      
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
      });

}