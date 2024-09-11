const router = require("express").Router();
const userRoutes = require("./userRoutes");
const map_routes = require("./map_routes");

router.use("/user", userRoutes);
router.use("/maps", map_routes);

module.exports = router;
