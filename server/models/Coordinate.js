const mongoose = require('mongoose');
const { Schema } = mongoose;

const coordinateSchema = new Schema({
  name: { type: String, required: true },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
},
  {
    timestamps: true
  });

coordinateSchema.pre('findOneAndDelete', async function (next) {
  const coord = await this.model.findOne(this.getFilter());  // Get the coordinate being deleted

  if (coord) {
    // Remove the coordinate's ObjectId from the map's coordinates array
    await mongoose.model('Map').updateMany(
      { coordinates: coord._id },        // Find maps that have this coordinate in their coordinates array
      { $pull: { coordinates: coord._id } }  // Remove the coordinate's ObjectId from the array
    );
  }

  next();
});

const Coordinate = mongoose.model('Coordinate', coordinateSchema);
module.exports = Coordinate;
