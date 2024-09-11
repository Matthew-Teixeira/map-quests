const router = require("express").Router();
const protected = require("../../middleware/authMiddleware");
const { get_user_maps } = require("../../controllers/mapController");

router.get("/my_maps", protected, get_user_maps);

module.exports = router;
