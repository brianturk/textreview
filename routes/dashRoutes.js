const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");
var moment = require('moment');

const today = moment();
const sevenDays = moment().subtract(7, "d");
module.exports = app => {
    app.post('/dashboard', (req, res) => {
        //query SELECT 
        db.Text.find({
            createdAt: {
            '$lte': today,
            '$gte': sevenDays
            },
            reviewComplete:true,
            reviewValid:true}).then(data => {
            if(data) {
                //Create function to process data to just 7 days with appropriate labels(MON-SUN)
                res.status(200).json(data);
            } else {
                res.status(400).json({"message":"No Data"});
            }
          }).catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    });
}
