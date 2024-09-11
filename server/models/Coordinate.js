const mongoose = require('mongoose');
const { Schema } = mongoose;

const coordinateSchema = new Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

const Coordinate = mongoose.model('Coordinate', coordinateSchema);
module.exports = Coordinate;
