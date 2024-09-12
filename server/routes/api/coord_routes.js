const router = require("express").Router();
const protected = require("../../middleware/authMiddleware");
const { get_one_coordinate, create_coordinate, delete_one_coordinate } = require("../../controllers/coordnateController");

router.get("/:coordinate_id", protected, get_one_coordinate);
router.post("/create_coordiante", protected, create_coordinate);
router.delete("/:coordinate_id", protected, delete_one_coordinate);

module.exports = router;