const router = require("express").Router();
const userRoutes = require("./userRoutes");
const time_routes = require("./time_routes");

router.use("/user", userRoutes);
router.use("/time", time_routes);

module.exports = router;
