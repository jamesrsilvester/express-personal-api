const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let PlaceSchema = new Schema ({
  name: String
})

let Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
