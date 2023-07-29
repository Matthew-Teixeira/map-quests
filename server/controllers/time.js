const { User, TimeCard, Time } = require("../models/index");
const { DateTime } = require("luxon");

const get_user_time = async (req, res) => {
  try {
    if (!req.user) {
      res.status(404);
      throw new Error("User could not be found");
    }
    const time_card = await TimeCard.findById(req.user.time_card)
      .populate("times")
      .select("-__v");

    res.json(time_card);
  } catch (error) {
    res.json({
      error: error.message
    });
  }
};

const save_user_time = async (req, res) => {
  try {
    if (!req.user) {
      res.status(404);
      throw new Error("User could not be found");
    }
    const { start_time, end_time } = req.body;

    const date_time_test = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
    const start_time_test = date_time_test.test(start_time);
    const end_time_test = date_time_test.test(end_time);
    if (!end_time_test || !start_time_test) {
      res.status(400);
      throw new Error("Could not validate datetimes");
    }

    const start = DateTime.fromISO(start_time);
    const end = DateTime.fromISO(end_time);

    let time_dif = end.diff(start, ["hours", "minutes"]).toObject();

    const time = {
      reg_hours: parseInt(time_dif.hours),
      reg_minutes: parseInt(time_dif.minutes),
      over_hours: 0,
      over_minutes: 0
    };
    if (time.reg_hours >= 8) {
      time.over_hours = time_dif.hours - 8;
      time.over_minutes = time_dif.minutes;
      time.reg_hours = 8;
      time.reg_minutes = 0;
    }

    const new_time = await Time.create({
      time_card: req.user._id,
      start_time,
      end_time,
      reg_hours: time.reg_hours,
      reg_minutes: time.reg_minutes,
      over_hours: time.over_hours,
      over_minutes: time.over_minutes
    });

    if (!new_time) {
      throw new Error("Time could not be saved to timecard.");
    }

    const updatedCard = await TimeCard.findOneAndUpdate(
      { _id: req.user.time_card },
      { $push: { times: new_time._id } },
      { new: true }
    )
      .populate("times")
      .select("-__v");

    res.json(updatedCard);
  } catch (error) {
    console.log(error.message);
    res.json({
      error: error.message
    });
  }
};

module.exports = { save_user_time, get_user_time };
