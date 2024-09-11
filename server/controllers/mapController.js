const { User, Token, Map, Coordinate } = require("../models/index");

const get_user_maps = async (req, res) => {
    try {
        if (!req.user) {
            res.status(404);
            throw new Error("User could not be found");
        }
        const user_id = req.user._id;
        const user_data = await User.findById(user_id).select('-__v -password -photos').populate({path: 'maps', select: '-__v'});
        console.log("\nuser_data");
        console.log(user_data);
        res.status(200).json(user_data);
    } catch (error) {
        console.log(error);
    }
};


module.exports = { get_user_maps };