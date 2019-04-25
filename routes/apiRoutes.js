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
  
  // SIGNUP ROUTE
  app.post('/api/signup', (req, res) => {
    db.User.create(req.body)
      .then(data => res.json(data))
      .catch(err => {  console.log(err); res.status(400).json(err)});
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
  
  
  app.get('/', isAuthenticated /* Using the express jwt MW here */, (req, res) => {
    res.send('You are authenticated'); //Sending some response when authenticated
  });

}