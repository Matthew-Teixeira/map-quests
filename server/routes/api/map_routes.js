const router = require("express").Router();
const protected = require("../../middleware/authMiddleware");
const { get_user_maps, get_map_by_id, create_new_map, delete_one_map, update_map_name } = require("../../controllers/mapController");

router.get("/my_maps", protected, get_user_maps);
router.get("/map/:map_id", protected, get_map_by_id);
router.post("/create_map", protected, create_new_map);
router.delete("/remove_map/:map_id", protected, delete_one_map);
router.put("/update_map/:map_id", protected, update_map_name);

module.exports = router;
