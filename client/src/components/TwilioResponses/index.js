import React from "react";

function TwilioResponses(props) {

    const styles = {
        responseInput: {
            width: "100%"
        }
    }

    return (
        <div>
            <hr />
            <h3>Text Responses</h3>
            <label htmlFor="surResValid">Valid Survey Response: </label>
            <input value={props.surResValid} onChange={props.handleInputChange} style={styles.responseInput} type="text" name="surResValid"></input>
            <br></br>
            <label htmlFor="surResInvalid">Invalid Survey Response: </label>
            <input value={props.surResInvalid} onChange={props.handleInputChange} style={styles.responseInput} type="text" name="surResInvalid"></input>
            <br></br>
            <label htmlFor="comResValid">Valid Comment Response: </label>
            <input value={props.comResValid} onChange={props.handleInputChange} style={styles.responseInput} type="text" name="comResValid"></input>
            <br></br>
            <label htmlFor="comResInvalid">Invalid Comment Response: </label>
            <input value={props.comResInvalid} onChange={props.handleInputChange} style={styles.responseInput} type="text" name="comResInvalid"></input>
            <button onClick={props.handleTwilioResponsesSubmit}>Submit Responses</button>
        </div>
    )

}

export default TwilioResponses;
