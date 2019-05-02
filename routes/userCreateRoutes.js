
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
            console.log(`addlocation `);
            console.log(req.body);
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


        
        // ROUTE FOR DELETING A LOCATION AND REMOVING ITS LINK FROM OWNING USER
        // -----------------------------------------------------------------------------------------
        app.delete("/api/deletelocation/:id/:userid", function (req, res) {   
            console.log(`deletelocation ${req.params.id} and from userid ${req.params.userid}`);
            db.Location.findOneAndRemove({ _id: req.params.id })
            .then( () => {  // remove the ID from the user.locations reference array
                return db.User.findOneAndUpdate({ _id: req.params.userid }, {$pull: { locations: req.params.id }}, { new: true });
                })
            .then( () => res.sendStatus(200)) 
            .catch(err => res.json(err));           
        });



        // ROUTE FOR UPDATING A LOCATION 
        // -----------------------------------------------------------------------------------------
        app.post("/api/updatelocation/:id", (req, res) => {       
            console.log(`updatelocation ${req.params.id}`);
            console.log(req.body);
            db.Location.findOneAndUpdate({ _id: req.params.id }, {location: req.body} , { new: true })
            .then( (dbLocation) => res.json(dbLocation))
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



