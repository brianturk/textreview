import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import LocationList from '../components/LocationList';
import contentEditable from '../components/ContentEditable';

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
    let EditableUserName = contentEditable('p', this, this.handleUserName);
    let EditableEmail = contentEditable('p');

    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={dashboardRoutes} />
        <div className="main-panel" ref="mainPanel">
          <div style={{ marginBottom: "50px" }}><Header dashColor={"black"} {...this.props} /></div>
          <hr />
          <div className="container Profile">
            <h3>Profile page</h3>
            <div className="container">
              <div className="row">
                <p>Username:</p> <EditableUserName value={this.state.username} id="username" />
              </div>
              <div className="row">
                <p>Email address:</p> <EditableEmail value={this.state.email} id="email" />
              </div>
            </div>

            <div>
              <div>
                <LocationList
                  userid={this.props.user.id}
                  history={this.props.history}
                />
              </div>
              <Link to="/addlocation">Add a location</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/importlocations/">Import locations</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/">Go home</Link>
            </div>


          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Profile);

