var moment = require('moment');
const db = require("../../../../models");

function get7Days() {
    var dates = [];
    for (let i = 0; i <= 7; i++) {
        let date = moment().subtract(i, "d");
        dates.push({ "date": date, "dof": moment(date).format("ddd") })
    }
    return dates;
}
const today = moment();
const sevenDays = moment().subtract(7, "d");

db.Text.find({
    createdAt: {
    '$lte': today,
    '$gte': sevenDays,
    '$group': '$createdAt'
    },
    reviewComplete:true,
    reviewValid:true}).then(data => {
    if(data) {
        console.log(data)
    } else {
        console.log("no data")
    }
  }).catch(err => {
    console.log(err)
  });

//   db.Text.create({
//     customerNumber: 1,
//     locationPhonenumber: 1234567890,
//     messages: [{textBody: "test"}],
//     reviewComplete: true,
//     reviewValid: true,
//     rating: 1,

// }).then(data => {
//     if(data) {
//         console.log(data)
//     } else {
//         console.log("no data")
//     }
//   }).catch(err => {
//     console.log(err)
//   });

// db.collection("log").find({
//     localHitDate: {
//             '$gte': new Date('2013-12-12T16:00:00.000Z'),
//             '$lt': new Date('2013-12-12T18:00:00.000Z')
//     }
// })