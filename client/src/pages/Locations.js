import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import withAuth from './../components/withAuth';
import LocationList from '../components/LocationList';


class Locations extends Component {
    
  render() {
    return (
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
    )
  }
}

export default withAuth(Locations);

