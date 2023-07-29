const { Schema, model } = require("mongoose");

const timeSchema = new Schema({
  time_card: {
    type: Schema.Types.ObjectId,
    ref: "TimeCard",
    required: true
  },
  start_time: {
    type: Date,
    required: [true, "Please add a start time"]
  },
  end_time: {
    type: Date,
    required: [true, "Please add a end time"]
  },
  reg_hours: {
    type: Number,
    required: true
  },
  reg_minutes: {
    type: Number,
    required: true
  },
  over_hours: {
    type: Number,
    required: true
  },
  over_minutes: {
    type: Number,
    required: true
  }
});

const Time = model("Time", timeSchema);

module.exports = Time;
