const { Map, Coordinate } = require("../models/index");

const get_one_coordinate = async (req, res) => {
    try {
        if (!req.user) {
            res.status(404);
            throw new Error("User could not be found");
        }
        const { coordinate_id } = req.params;

        const coordinate = await Coordinate.findById(coordinate_id).select('-__v');

        if (!coordinate) {
            res.status(404);
            throw new Error("Coordinates could not be found");
        }

        res.status(200).json(coordinate);
    } catch (error) {
        console.log(error);
        res.json({
            error: error.message
        });
    }
};

const create_coordinate = async (req, res) => {
    try {
        const { name, latitude, longitude, map_id } = req.body;
        console.log(latitude);
        // Create some coordinates
        const coordinate = await Coordinate.create({ name, latitude, longitude });

        await Map.findOneAndUpdate({ _id: map_id }, { $push: { coordinates: coordinate._id } });

        res.status(201).json(coordinate);
    } catch (error) {
        console.log(error);
        res.json({
            error: error.message
        });
    }
};

const delete_one_coordinate = async (req, res) => {
    try {
        const { coordinate_id } = req.params;

        await Coordinate.findOneAndDelete({ _id: coordinate_id });

        res.status(200).json({ message: "Coordinate was deleted" });
    } catch (error) {
        console.log(error);
        res.json({
            error: error.message
        });
    }
};

module.exports = { get_one_coordinate, create_coordinate, delete_one_coordinate };