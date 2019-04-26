import axios from 'axios';
import AddLocation from '../pages/AddLocation';


export default {

    // ROUTE FOR GETTING USER
    // TODO MODIFY ROUTE AND SERVER SIDE TO GET WITHOUT POPULATING LOCATIONS
    // -----------------------------------------------------------------------------------------
    // app.get("/api/user/:id", function(req, res) {
    getUser: (id) => {
      return axios.get(`/api/user/${id}`);
    },


    // SIGNUP ROUTE
    // -----------------------------------------------------------------------------------------
    // app.post('/api/signup', (req, res) => {
    signUpUser: (username, email, password, street, city, state, zip) => {
      return axios.post('api/signup', { 
                                        username : username, 
                                        email :    email, 
                                        password : password, 
                                        street :   street,
                                        city :     city, 
                                        state :    state, 
                                        zip :      zip } );
                                      },

    
    // ROUTE FOR GETTING A USER AND ALL ITS LOCATIONS
    // -----------------------------------------------------------------------------------------
    // app.get("/api/user/:id", function(req, res) {
    getLocations: (id ) => {
      return axios.post(`api/user/${id}`);
    },


    // ROUTE FOR ADDING A LOCATION TO LOCATION COLLECTION AND ADDING ITS LINK TO USER
    // -----------------------------------------------------------------------------------------
    // app.post("/api/addlocation/:id", function(req, res) {     
      //
      //  How to get the userid from the state of the Location object 
      //  from around line 25 of AddLocation.js, which calls this API.addLocation
      //  userid is needed to create a location, but its not obvious how to get
      //  that inside the AddLocation object.

    addLocation : (locationName, street, city, state, zip, phonenumber, userid) => {
      return axios.post(`api/addlocation/${userid}`, {  
                                                    locationName :    locationName,  
                                                    street :          street,
                                                    city :            city,
                                                    state :           state,
                                                    zip :             zip,
                                                    phonenumber :     phonenumber,
                                                    userid :          userid
                                                  })
      }
  }

