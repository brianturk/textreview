import React, { Component } from "react";
import API from "../../utils/API";
import withAuth from '../../components/withAuth';
import Popup from 'reactjs-popup'


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

    render() {
        const styles = {
            responseInput: {
                width: "50%",
                marginLeft: "20px"
            },
            responseLabel: {
                marginLeft: "20px"
            },
            responseButton: {
                marginLeft: "20px"
            }
        }
        return (
            <div>
                <hr />
                <h3>Text Responses</h3>
                <Popup
                    trigger={<label style={styles.responseLabel} htmlFor="surResValid">Valid Survey Response: </label>}
                    position="right top"
                    on="hover">
                    <p>Define the response to send to a customer upon receipt of a valid 1-10 review.</p>
                    <p>Default message: "Thank You for the feedback! If you would like to add additional comments, just respond to this number!"</p>
                </Popup>
                <br></br>
                <textarea value={this.state.surResValid} onChange={this.handleInputChange} style={styles.responseInput} type="text" name="surResValid"></textarea>
                <br></br>
                <Popup
                    trigger={<label style={styles.responseLabel} htmlFor="surResInvalid">Invalid Survey Response: </label>}
                    position="right top"
                    on="hover">
                    <p>Define the response to send to a customer upon receipt of a invalid 1-10 review.</p>
                    <p>Default message: "Please respond with a rating of 1-10!"</p>
                </Popup>
                <br></br>
                <textarea value={this.state.surResInvalid} onChange={this.handleInputChange} style={styles.responseInput} type="text" name="surResInvalid"></textarea>
                <br></br>
                <Popup
                    trigger={<label style={styles.responseLabel} htmlFor="comResValid">Valid Comment Response: </label>}
                    position="right top"
                    on="hover">
                    <p>Define the response to send to a customer upon receipt of valid additional comments.</p>
                    <p>Default message: "Thank You for the feedback! Your comments are appreciated."</p>
                </Popup>
                <br></br>
                <textarea value={this.state.comResValid} onChange={this.handleInputChange} style={styles.responseInput} type="text" name="comResValid"></textarea>
                <br></br>
                <Popup
                    trigger={<label style={styles.responseLabel} htmlFor="comResInvalid">Invalid Comment Response: </label>}
                    position="right top"
                    on="hover">
                    <p>Define the response to send to a customer upon receipt of invalid additional comments.</p>
                    <p>Default message: "Please respond with any additional comments you have. That last message didn't look like a comment..."</p>
                </Popup>
                <br></br>
                <textarea value={this.state.comResInvalid} onChange={this.handleInputChange} style={styles.responseInput} type="text" name="comResInvalid"></textarea>
                <br></br>
                <button style={styles.responseButton} onClick={this.handleTwilioResponsesSubmit}>Submit Responses</button>
            </div>
        )
    }

}

export default withAuth(TwilioResponses);
