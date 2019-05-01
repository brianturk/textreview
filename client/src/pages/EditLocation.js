
// Each user can have multiple locations they are tracking for text reviews
// This page allows users to add those locations to the system

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../components/AuthService';
import withAuth from '../components/withAuth';
import API from '../utils/API';
import Location from '../utils/Location';

class EditLocation extends Component {

    state = {
        locationName:   "",
        street:         "",
        city:           "",
        state:          "",
        zip:            "",
        phonenumber:    "",
        userid:         ""
      };
    

  constructor() {
    super();
    this.Auth = new AuthService();

    console.log(this);
  }

  componentDidMount () {
    console.log("this.props.location.state");
    console.log(this.props.location.state);
    // this.setState(this.state.locationName, this.props.location.state.locationName);
    //const  row  = this.props.location.state;
  }

  handleFormSubmit = event => {
    event.preventDefault();

     // updateLocation : (locationName, street, city, state, zip, phonenumber, userid) 
    var newLocation = new Location({    
                                "locationName"  :       this.state.locationName, 
                                "street"        :       this.state.street, 
                                "city"          :       this.state.city, 
                                "state"         :       this.state.state, 
                                "zip"           :       this.state.zip,
                                "phonenumber"   :       this.state.phonenumber,
                                "userid"        :       this.props.user.id
                            });

    API.updateLocation(newLocation)
      .then(res => {
        // once the user has updated a location send them to the profile page
        this.props.history.replace('/profile');
      })
      .catch(err => alert(err));
  };



  handleChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };



  render() {
    return (
      <div className="container">

        <h1>Edit Location</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="locationName">Location Name:</label>
            <input className="form-control"
                   placeholder={this.props.location.state.row.locationName}
                   value={this.props.location.state.row.locationName}
                   name="locationName"
                   type="text"
                   id="locationName"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="phonenumber">Phone number:</label>
            <input className="form-control"
                   placeholder="Texting phone number of location goes here..."
                   value={this.props.location.state.row.phonenumber}
                   name="phonenumber"
                   type="text"
                   id="phonenumber"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="street">Street Address:</label>
            <input className="form-control"
                   placeholder="Street goes here..."
                   value={this.props.location.state.row.street}
                   name="street"
                   type="text"
                   id="street"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input className="form-control"
                   placeholder="City goes here..."
                   value={this.props.location.state.row.city}
                   name="city"
                   type="text"
                   id="city"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input className="form-control"
                   placeholder="State goes here..."
                   value={this.props.location.state.row.state}
                   name="state"
                   type="text"
                   id="state"
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip Code:</label>
            <input className="form-control"
                   placeholder="Zip code goes here..."
                   value={this.props.location.state.row.zip}
                   name="zip"
                   type="text"
                   id="zip"
                   onChange={this.handleChange}/>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default withAuth(EditLocation);