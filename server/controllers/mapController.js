const { User, Map } = require("../models/index");

const get_user_maps = async (req, res) => {
    try {
        if (!req.user) {
            res.status(404);
            throw new Error("User could not be found");
        }
        const user_id = req.user._id;
        const user_data = await User.findById(user_id).select('-__v -password -photos').populate({ path: 'maps', select: '-__v' });

        res.status(200).json(user_data);
    } catch (error) {
        console.log(error);
        res.json({
            error: error.message
        });
    }
};

const get_map_by_id = async (req, res) => {
    try {
        const { map_id } = req.params;
        const map = await Map.findById(map_id).select('-__v').populate({ path: 'coordinates', select: '-__v' });

        if (!map) {
            res.status(404);
            throw new Error("Could not find this map");
        }

        res.status(200).json(map);
    } catch (error) {
        console.log(error);
        res.json({
            error: error.message
        });
    }
};

const create_new_map = async (req, res) => {
    try {

        const { map_name } = req.body;
        const user_id = req.user._id;

        console.log("\nmap_name");
        console.log(map_name);

        if (!map_name) {
            res.status(404);
            throw new Error("No map name provided");
        }

        const map = await Map.create({ name: map_name });

        console.log("\nmap");
        console.log(map._id);

        console.log("\nuser_id");
        console.log(user_id);

        await User.findOneAndUpdate({ _id: user_id }, { $push: { maps: map._id } });

        res.status(201).json({ message: `New map ${map_name} was succefully created!` });
    } catch (error) {
        console.log(error);
        res.json({
            error: error.message
        });
    }
};

const update_map_name = async (req, res) => {
    try {
        const { map_id } = req.params;
        const { map_name } = req.body;
        if (!map_id) {
            res.status(404);
            throw new Error("Could not find this map");
        }

        await Map.findByIdAndUpdate({ _id: map_id }, { name: map_name });

        res.status(201).json({ message: `Map name updated to ${map_name} was succeful!` });
    } catch (error) {
        console.log(error);
        res.json({
            error: error.message
        });
    }
};

const delete_one_map = async (req, res) => {
    try {
        const { map_id } = req.params;
        if (!map_id) {
            res.status(404);
            throw new Error("Could not find this map");
        }
        await Map.findOneAndDelete({ _id: map_id });
        res.status(202).json({ message: `Map was successfully deleted` });
    } catch (error) {
        console.log(error);
        res.json({
            error: error.message
        });
    }
};


module.exports = { get_user_maps, get_map_by_id, create_new_map, delete_one_map, update_map_name };