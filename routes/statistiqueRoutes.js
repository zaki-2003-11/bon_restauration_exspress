const router = require("express").Router();

const controller = require("../controllers/statistiqueController");

router.get("/dashboard", controller.dashboard);

module.exports = router;