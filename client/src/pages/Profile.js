import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import LocationList from '../components/LocationList';
import contentEditable from '../components/ContentEditable';
import TwilioResponses from '../components/TwilioResponses';

class Profile extends Component {

  state = {
    username: "",
    email: "",
    locations: [],
    surResValid: "",
    surResInvalid: "",
    comResValid: "",
    comResInvalid: ""
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email,
        locations: res.data.locations,
        surResValid: res.data.twilioResponses.surResValid || "",
        surResInvalid: res.data.twilioResponses.surResInvalid || "",
        comResValid: res.data.twilioResponses.comResValid || "",
        comResInvalid: res.data.twilioResponses.comResInvalid || ""
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleTwilioResponsesSubmit = event => {
    event.preventDefault();
    API
      .submitTwilioResponses(this.state.surResValid, this.state.surResInvalid, this.state.comResValid, this.state.comResInvalid)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }



  render() {
    let EditableUserName = contentEditable('p', this, this.handleUserName);
    let EditableEmail = contentEditable('p');

    return (
      <div className="container Profile">
        <h3>Profile page</h3>
          <div className = "container">
              <div className = "row">
                <p>Username:</p> <EditableUserName value={this.state.username} id="username" />
              </div>
              <div className = "row">
                <p>Email address:</p> <EditableEmail value={this.state.email} id="email"/>
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

        <div>
            <TwilioResponses 
              handleInputChange={this.handleInputChange}
              handleTwilioResponsesSubmit = {this.handleTwilioResponsesSubmit}
              responses={this.state.twilioResponses}
              surResValid={this.state.surResValid}
              surResInvalid={this.state.surResInvalid}
              comResValid={this.state.comResValid}
              comResInvalid={this.state.comResInvalid}
            />
      </div>

      </div>
    )
  }
}

export default withAuth(Profile);

