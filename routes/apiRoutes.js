const db = require("../models");
const isAuthenticated = require("../config/isAuthenticated");
const auth = require("../config/auth");


// LOGIN ROUTE
module.exports = app => {

    app.post('/api/login', (req, res) => {
        auth
          .logUserIn(req.body.email, req.body.password)
          .then(dbUser => res.json(dbUser))
          .catch(err => res.status(400).json(err));
    });
  

    // Any route with isAuthenticated is protected and you need a valid token
    // to access
    app.get('/api/user/:id', isAuthenticated, (req, res) => {
      db.User.findById(req.params.id).then(data => {
        if(data) {
          res.json(data);
        } else {
          res.status(404).send({success: false, message: 'No user found'});
        }
      }).catch(err => res.status(400).send(err));
    });


    //just used to create dummy data for the demonstration
    app.post('/api/createdata/', (req,res) => {
      let passcode = 'sasparilla'  //passcode so no one creates dummy data accidentally

      if (req.body.passcode === 'sasparilla'){
        let user = 
          {
            username: 'vernsair',
            email: 'bturksub@gmail.com',
            password: 'password',
            streetaddress: '123 West Elm Ln',
            city: 'San Diego',
            state: 'CA',
            zipCode: '87343'
          }
        
        let locations = [
            {
              streetAddress: '14 Pacific Dr',
              city: 'La Jolla',
              state: 'CA',
              zipCode: '92037',
              phonenumber: '8585552323'
            },
            {
              streetAddress: '14 Atlantic Ave',
              city: 'El Cajon',
              state: 'CA',
              zipCode: '67047',
              phonenumber: '7603437766'
            },
            {
              streetAddress: '120 Pacific Dr',
              city: 'La Jolla',
              state: 'CA',
              zipCode: '92037',
              phonenumber: '8585552323'
            },
            {
              streetAddress: '14 Pacific Dr',
              city: 'La Jolla',
              state: 'CA',
              zipCode: '92037',
              phonenumber: '8585552323'
            }
          ]
        
        //create 4



      }
    }

}
