const mongoose = require('mongoose');
const { Schema } = mongoose;
const Coordinate = require("./Coordinate");

const mapSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    coordinates: [{ type: Schema.Types.ObjectId, ref: "Coordinate" }]  // Array of coordinates
},
    {
        timestamps: true
    });

// Pre middleware to remove coordinates when a map is deleted
mapSchema.pre('findOneAndDelete', async function (next) {
    const map = await this.model.findOne(this.getFilter());  // Get the map being deleted

    if (map) {
        // Delete associated coordinates
        await mongoose.model('Coordinate').deleteMany({ _id: { $in: map.coordinates } });

        // Remove the map's ObjectId from the user's maps array
        await mongoose.model('User').updateMany(
            { maps: map._id },        // Find users that have this map in their maps array
            { $pull: { maps: map._id } }  // Remove the map's ObjectId from the array
        );
    }

    next();
});

const Map = mongoose.model('Map', mapSchema);
module.exports = Map;
