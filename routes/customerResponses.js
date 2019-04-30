const db = require("../models");

//customer object to hold the responses and ID of the customer they belong to
function Customer(id, surResValid, surResInvalid, comResValid, comResInvalid) {
    this.id = id;
    this.surResValid = surResValid;
    this.surResInvalid = surResInvalid;
    this.comResValid = comResValid;
    this.comResInvalid = comResInvalid;
}

function updateResponses() {

    let customerResponses = [];

    return db.User
        .find({})
        .then(dbUser => {
            // console.log(dbUser);
            dbUser.forEach(user => {
                customerResponses.push(new Customer(
                    user._id,
                    user.twilioResponses.surResValid,
                    user.twilioResponses.surResInvalid,
                    user.twilioResponses.comResValid,
                    user.twilioResponses.comResInvalid))
            })
            // console.log(customerResponses);
            return customerResponses;
        })
}

module.exports = updateResponses;