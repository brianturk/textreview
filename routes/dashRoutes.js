const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID

const today = moment().toDate();
const sevenDays = moment().subtract(6, "d").toDate();
module.exports = app => {
    app.post('/dashboard', (req, res) => {
        // db.Text.find({
        //     createdAt: {
        //     '$lte': today,
        //     '$gte': sevenDays
        //     },
        //     reviewComplete:true,
        //     reviewValid:true}).then(data => {
        //     if(data) {
        //         //Create function to process data to just 7 days with appropriate labels(MON-SUN)
        //         res.status(200).json(data);
        //         console.log(data)
        //     } else {
        //         res.status(400).json({"message":"No Data"});
        //     }
        //   }).catch(err => {
        //     console.log(err);
        //     res.status(400).json(err);
        //   });
        var theObj = {
            "userid": ObjectId(req.body.userId),
            "createdAt": { $lte: today, $gte: sevenDays },
            reviewComplete: true,
            reviewValid: true
        };
        if (req.body.locationId && req.body.locationId != 0) {
            theObj = {
                "locationPhonenumber": req.body.locationId,
                "userid": ObjectId(req.body.userId),
                "createdAt": { $lte: today, $gte: sevenDays },
                reviewComplete: true,
                reviewValid: true
            };
        }
        // db.Location.find({ userid: ObjectId(req.body.userId) }).then(locationData => {
        //     if (locationData) {
                db.Text
                    .aggregate([
                        {
                            $match: theObj
                        },
                        {
                            $group: {
                                _id:
                                {
                                    month: { $month: "$createdAt" },
                                    day: { $dayOfMonth: "$createdAt" },
                                    year: { $year: "$createdAt" }
                                },
                                aveRating: { $avg: "$rating" },
                            }
                        },
                        {
                            $sort: {
                                "_id.year": 1,
                                "_id.month": 1,
                                "_id.day": 1
                            }
                        }
                    ])

                    .then(data => {
                        if (data) {
                            //Create function to process data to just 7 days with appropriate labels(MON-SUN)
                            res.status(200).json(data);
                            //console.log(data)
                        } else {
                            res.status(400).json({ "message": "No Data" });
                        }
                    }).catch(err => {
                        console.log(err);
                        res.status(400).json(err);
                    });

        //     } else {
        //         res.status(400).json({ "message": "No Data" });
        //     }
        // }).catch(err1 => {
        //     console.log(err1);
        //     res.status(400).json(err1);
        // });



    });

}
