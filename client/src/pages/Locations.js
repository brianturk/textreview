import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import withAuth from './../components/withAuth';
import LocationList from '../components/LocationList';

import Sidebar from './../components/Sidebar/Sidebar.jsx';
import dashboardRoutes from "./../dashboard/routes/dashboard.jsx";
import Header from './../components/Header/Header.jsx';

class Locations extends Component {
    
  render() {
    return (
      <div className="wrapper">
      <Sidebar {...this.props} routes={dashboardRoutes} />
      <div className="main-panel" ref="mainPanel">
        <div style={{ marginBottom: "50px" }}><Header dashColor={"black"} {...this.props} /></div>
        <hr />
      <div className="container Profile">
              <div className = "container">
                  <h4>Location Info</h4>      
                  <div>
                    <LocationList 
                      userid={this.props.user.id}
                      history={this.props.history}
                    />
                  </div>
              </div>

          <Link to="/addlocation">Add a location</Link>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/importlocations/">Import locations</Link>&nbsp;&nbsp;&nbsp;&nbsp;
          
      </div>
      </div>
      </div>
    )
  }
}

export default withAuth(Locations);

