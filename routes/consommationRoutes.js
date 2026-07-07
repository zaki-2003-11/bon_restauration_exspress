const router = require("express").Router();
const controller = require("../controllers/consommationController");

router.get("/", controller.getAll);

router.post("/", controller.create);

router.post("/bulk", controller.bulkCreate);

module.exports = router;