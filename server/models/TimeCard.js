const { Schema, model } = require("mongoose");

const timeCardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    times: [
      {
        type: Schema.Types.ObjectId,
        ref: "Time"
      }
    ]
  },
  {
    timestamps: true
  }
);

const TimeCard = model("TimeCard", timeCardSchema);

module.exports = TimeCard;
