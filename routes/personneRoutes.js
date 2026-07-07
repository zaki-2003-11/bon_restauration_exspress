const router = require("express").Router();

const controller = require("../controllers/personneController");

router.get("/", controller.getAll);

router.post("/", controller.create);

module.exports = router;