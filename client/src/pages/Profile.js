import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import { Link } from 'react-router-dom';
import LocationList from '../components/LocationList';


class Profile extends Component {

  state = {
    username: "",
    email: "",
    locations : []
  };


  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
       this.setState({
        username:   res.data.username,
        email:      res.data.email,
        locations:  res.data.locations
      })
    });
  }


  render() {
    return (
      <div className="container Profile">
        <h3>Profile page</h3>
        <p>Username: {this.state.username}</p>
        <p>Email: {this.state.email}</p>
        <div>
          <h3> Locations : </h3>
          <LocationList 
            locations={this.state.locations}
          />
        </div>
        <Link to="/addlocation">Add a location</Link>
        <Link to="/">Go home</Link>
      </div>
    )
  }
}

export default withAuth(Profile);

