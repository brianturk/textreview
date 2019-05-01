import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import LocationList from '../components/LocationList';
import contentEditable from '../components/ContentEditable';

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
        // locations:  res.data.locations
      })
    });

  }


  // TODO: 
  // Called by editable user name to update state in Profile
  handleUserName(parent, editItem) {

    console.log(`handleUserName ${editItem}`);

    // update state here
    parent.setState({username: editItem});

  }



  render() {
    let EditableUserName = contentEditable('p', this, this.handleUserName);
    let EditableEmail = contentEditable('p');

    return (
      <div className="container Profile">
        <h3>Profile page</h3>

          <div className = "row">
            <p>Username:</p> <EditableUserName value={this.state.username} id="username" />
          </div>
          <div className = "row">
          <p>Email address:</p> <EditableEmail value={this.state.email} id="email"/>
          </div>

          <div>        
            <div>
              <LocationList 
                userid={this.props.user.id}
/*                 locations={this.state.locations} */
                history={this.props.history}
              />
            </div>
            <Link to="/addlocation">Add a location</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/importlocations/">Import locations</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/">Go home</Link>
          </div>
      </div>
    )
  }
}

export default withAuth(Profile);

