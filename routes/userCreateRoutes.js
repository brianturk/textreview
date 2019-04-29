
// Routes for creating and editing user accounts

const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");
const auth = require("../config/auth");


module.exports = app => {


        // SIGNUP ROUTE
        // -----------------------------------------------------------------------------------------
        app.post('/api/signup', (req, res) => {
            db.User.create(req.body)
            .then(data => res.json(data))
            .catch(err => {  console.log(err); res.status(400).json(err)});
        });



        // ROUTE FOR GETTING ALL USERS, WITHOUT POPULATING LOCATIONS
        // -----------------------------------------------------------------------------------------
        app.get("/api/users", function(req, res) {
            db.User.find({})
            .then(function(dbUsers) {
                res.json(dbUsers);
            })
            .catch(function(err) {
                res.json(err);
            });
        });



        // ROUTE FOR ADDING A LOCATION TO LOCATION COLLECTION AND ADDING ITS LINK TO USER
        // -----------------------------------------------------------------------------------------
        app.post("/api/addlocation", function(req, res) {       

            db.Location.create(req.body)
            .then(function(dbLocation) {
                return db.User.findOneAndUpdate({ _id: req.body.userid }, {$push: { locations: dbLocation._id }}, { new: true });
            })
            .then(function(dbUser) {
                res.json(dbUser);
            })
            .catch(function(err) {
                res.json(err);
            });
        });



        // ROUTE FOR GETTING A USER AND ALL ITS LOCATIONS
        // -----------------------------------------------------------------------------------------
        app.get("/api/user/:id", function(req, res) {
            db.User.findOne({ _id: req.params.id })
            .populate("locations")
            .then(function(dbUser) {
                res.json(dbUser);
            })
            .catch(function(err) {
                res.json(err);
            });
        });
} 