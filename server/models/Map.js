const mongoose = require('mongoose');
const { Schema } = mongoose;
const Coordinate = require("./Coordinate");

const mapSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    coordinates: [{ type: Schema.Types.ObjectId, ref: "Coordinate" }]  // Array of coordinates
});

const Map = mongoose.model('Map', mapSchema);
module.exports = Map;
