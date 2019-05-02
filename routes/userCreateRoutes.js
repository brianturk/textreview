
// Routes for creating and editing user accounts

const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");
const auth = require("../config/auth");
const locationSeedData = require("./../locationseed.json");


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
            .then(dbUser => res.json(dbUser))
            .catch(err => res.json(err));
        });



        // ROUTE FOR ADDING A LOCATION TO LOCATION COLLECTION AND ADDING ITS LINK TO USER
        // -----------------------------------------------------------------------------------------
        app.post("/api/addlocation", function(req, res) {       

            db.Location.create(req.body)
            .then(function(dbLocation) {
                return db.User.findOneAndUpdate({ _id: req.body.userid }, {$push: { locations: dbLocation._id }}, { new: true });
            })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.json(err));
        });



        // ROUTE FOR GETTING A USER AND ALL ITS LOCATIONS
        // -----------------------------------------------------------------------------------------
        app.get("/api/user/:id", function(req, res) {
            db.User.findOne({ _id: req.params.id })
            .populate("locations")
            .then(dbUser => res.json(dbUser))
            .catch(err => res.json(err));
        });



        // ROUTE FOR GETTING A USER WITHOUT LOCATIONS
        // -----------------------------------------------------------------------------------------
        app.get("/api/userlite/:id", function(req, res) {
            db.User.findOne({ _id: req.params.id })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.json(err));
        });


        
        // ROUTE FOR DELETING A LOCATION
        // -----------------------------------------------------------------------------------------
        // TODO: extend to remove ID from user.locations array
        app.delete("/api/deletelocation/:id", (req, res) => {   
            console.log(`DELETE ${req.body}`);
            db.Location.findOneAndRemove({ _id: req.body.id })
            .then( (dbLocation) => {
                return db.User.findOneAndUpdate({ _id: req.body.userid }, {$pull: { locations: dbLocation._id }}, { new: true });
                })
            .then( () => res.sendStatus(200)) 
            .catch(err => res.json(err));           
        });



        // ROUTE FOR UPDATING A LOCATION 
        // -----------------------------------------------------------------------------------------
        app.post("/api/updatelocation", function(req, res) {       
            db.Location.findOneAndUpdate({ _id: req.params.id }, {location: req.body} )
            .then((dbLocation) => res.sendStatus(200))
            .catch(err => res.json(err))
        });


        // ROUTE IMPORT LOCATION DATA FOR DEBUGGING
        // -----------------------------------------------------------------------------------------
        app.get("/api/importlocations", (req, res) => {   

            res.sendStatus(404);
            // console.log(locationSeedData);
            // for (let i = 0; i < locationSeedData.length; i++) {
            //     db.Location.create(locationSeedData[i])
            //     .then()
            // }
            // db.Location.create(req.body)
            // .then(function(dbLocation) {
            //     return db.User.findOneAndUpdate({ _id: req.body.userid }, {$push: { locations: dbLocation._id }}, { new: true });
            // })
            // .then(dbUser => res.json(dbUser))
            // .catch(err => res.json(err));
        });
} 



