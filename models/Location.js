const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  street: {
    type: String,
    required: false,
    trim: true
  },
  city: {
    type: String,
    required: false,
    trim: true
  },
  state: {
    type: String,
    required: false,
    trim: true
  },
  zip: {
    type: String,
    required: false,
    trim: true
  },
  phonenumber: {
    type: String,
    required: true,
    trim: true
  },
  userid: {
    type: String
  }
});


const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;