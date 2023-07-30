const router = require("express").Router();
const {
  save_user_time,
  get_user_time,
  edit_time
} = require("../../controllers/time");
const protected = require("../../middleware/authMiddleware");

router.get("/", protected, get_user_time);
router.post("/", protected, save_user_time);
router.put("/:id", protected, edit_time);

module.exports = router;
