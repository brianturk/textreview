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
        console.log("Incoming message body");
        console.log(req.body);
        //Check to see if an unfinished text exists with that incoming number.
        db.Text
            .find({ customerPhonenumber: req.body.From, reviewComplete: false })
            .then(dbText => {
                console.log("Response from initial database query");
                console.log(dbText);
                //if it does, find what step we are at
                if (dbText.length > 0) {
                    //check if the message is just a number. If it is, respond back with a message prompting them for a review.
                    //could implement other checking on the message to ensure it's a valid review. I'm not sure how to do that yet, though.
                    if (isNaN(req.body.Body)) {
                        //If they sent back a valid review, thank them and add the review to the userComment section of the document
                        //Also closes out the document by marking review complete true because it is now finished.
                        db.Text
                            .findOneAndUpdate({ _id: dbText[0]._id }, {
                                userComment: req.body.Body,
                                $push: { messages: { textBody: req.body.Body } },
                                reviewComplete: true,
                                reviewValid: true
                            })
                            .then(updatedDbText => {
                                const twiml = new MessagingResponse();
                                twiml.message("Thank You for your additional comments!");
                                res.writeHead(200, { 'Content-Type': 'text/xml' });
                                res.end(twiml.toString());
                            })
                            .catch(err => console.log(err));
                    }
                    //handling if they just sent back a number instead of an actual review.
                    //Also pushes their message into the messages array for later review if needed.
                    else {
                        db.Text
                            .findOneAndUpdate({ _id: dbText[0]._id }, { $push: { messages: { textBody: req.body.Body } } })
                            .then(updatedDbText => {
                                const twiml = new MessagingResponse();
                                twiml.message("Please respond with any additional comments you would like to add. Your last message didn't look like a comment...");
                                res.writeHead(200, { 'Content-Type': 'text/xml' });
                                res.end(twiml.toString());
                            })
                            .catch(err => console.log(err));
                    }
                }
                //if it doesn't then create a new text. Search for the locations matching the number the text was sent to
                else {
                    //Find the associated location by the phonenumber the consumer texted
                    db.Location
                        .findOne({ phonenumber: req.body.To })
                        .then(dbLocation => {
                            //create new text in the database
                            db.Text.create({
                                customerPhonenumber: req.body.From,
                                locationPhonenumber: req.body.To,
                                messages: [
                                    { textBody: req.body.Body }
                                ],
                                reviewValid: true,
                                rating: parseInt(req.body.Body.trim()),
                                userId: dbLocation.userId
                            })
                                //If the 1-10 review was succesfully added to the database, send this.
                                .then(newDbText => {
                                    const twiml = new MessagingResponse();
                                    twiml.message("Thank You for your review! If you would like to leave an additional comment, respond to this message.");
                                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                                    res.end(twiml.toString());
                                })
                                //If the review was not 1-10, the database won't add it and will return an error.
                                //We respond with this message prompting the user to try again.
                                .catch(err => {
                                    console.log(err);
                                    const twiml = new MessagingResponse();
                                    twiml.message("Please send a valid rating. Numbers 1 - 10 are accepted.");
                                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                                    res.end(twiml.toString());
                                });

                        })
                        .catch(err => console.log(err));
                }
            })

    });


}