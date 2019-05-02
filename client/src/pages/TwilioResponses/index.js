import React, { Component } from "react";
import API from "../../utils/API";
import withAuth from '../../components/withAuth';

import Sidebar from './../../components/Sidebar/Sidebar.jsx';
import dashboardRoutes from "./../../dashboard/routes/dashboard.jsx";
import Header from './../../components/Header/Header.jsx';

class TwilioResponses extends Component {

    state = {
        surResValid: "",
        surResInvalid: "",
        comResValid: "",
        comResInvalid: ""
    }

    componentDidMount() {
        API.getUser(this.props.user.id).then(res => {
          this.setState({
            surResValid: res.data.twilioResponses.surResValid,
            surResInvalid: res.data.twilioResponses.surResInvalid,
            comResValid: res.data.twilioResponses.comResValid,
            comResInvalid: res.data.twilioResponses.comResInvalid
          })
        });
    
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

    render () {
        const styles = {
            responseInput: {
                width: "100%"
            }
        }
        return (
          <div className="wrapper">
      <Sidebar {...this.props} routes={dashboardRoutes} />
      <div className="main-panel" ref="mainPanel">
        <div style={{ marginBottom: "50px" }}><Header dashColor={"black"} {...this.props} /></div>
        <hr />
        <div className="container">
            <h3>Text Responses</h3>
            <label htmlFor="surResValid">Valid Survey Response: </label>
            <input value={this.state.surResValid} onChange={this.handleInputChange} style={styles.responseInput} type="text" name="surResValid"></input>
            <br></br>
            <label htmlFor="surResInvalid">Invalid Survey Response: </label>
            <input value={this.state.surResInvalid} onChange={this.handleInputChange} style={styles.responseInput} type="text" name="surResInvalid"></input>
            <br></br>
            <label htmlFor="comResValid">Valid Comment Response: </label>
            <input value={this.state.comResValid} onChange={this.handleInputChange} style={styles.responseInput} type="text" name="comResValid"></input>
            <br></br>
            <label htmlFor="comResInvalid">Invalid Comment Response: </label>
            <input value={this.state.comResInvalid} onChange={this.handleInputChange} style={styles.responseInput} type="text" name="comResInvalid"></input>
            <button onClick={this.handleTwilioResponsesSubmit}>Submit Responses</button>
        </div>
        </div>
        </div>
        )
    }

}

export default withAuth(TwilioResponses);
