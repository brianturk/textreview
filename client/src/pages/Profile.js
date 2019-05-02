import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import LocationList from '../components/LocationList';

import Sidebar from './../components/Sidebar/Sidebar.jsx';
import dashboardRoutes from "./../dashboard/routes/dashboard.jsx";
import Header from './../components/Header/Header.jsx';

class Profile extends Component {

  state = {
    username: "",
    email: "",
    locations: [],
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email,
        street: res.data.street,
        city: res.data.city,
        state: res.data.state,
        zip: res.data.zip,
        locations: res.data.locations,
      })
    });

  }


  // TODO: 
  // Called by editable user name to update state in Profile
  handleUserName(parent, editItem) {

    console.log(`handleUserName ${editItem}`);

    // update state here
    parent.setState({ username: editItem });

  }





  render() {


    return (

      <div className="wrapper">
      <Sidebar {...this.props} routes={dashboardRoutes} />
      <div className="main-panel" ref="mainPanel">
        <div style={{ marginBottom: "50px" }}><Header dashColor={"black"} {...this.props} /></div>
        <hr />

      <div className="container Profile">

              <div className = "container">  
                  <h4>Profile Info</h4>
                    <div className = "row">
                        <p>Username: {this.state.username} </p>
                    </div>
                    <div className = "row">
                        <p>Email address: {this.state.email} </p>
                    </div>
                    <div className = "row">
                        <p>Street: {this.state.street} </p>
                    </div>
                    <div className = "row">
                        <p>City: {this.state.city} </p>
                    </div>
                    <div className = "row">
                        <p>State: {this.state.state} </p>
                    </div>
                    <div className = "row">
                        <p>Zip: {this.state.zip} </p>
                    </div>
                    <Link to="/editprofile">Edit Profile Information</Link>
              </div>
        
              <div className = "container">
                  <h4>Location Info</h4>      
                  <div>
                    <LocationList 
                      userid={this.props.user.id}
                      history={this.props.history}
                    />
                  </div>
                  <Link to="/addlocation">Add a location</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/importlocations/">Import locations</Link>&nbsp;&nbsp;&nbsp;&nbsp;
              </div>



          </div>
        </div>
      </div>


    )
  }
}

export default withAuth(Profile);

