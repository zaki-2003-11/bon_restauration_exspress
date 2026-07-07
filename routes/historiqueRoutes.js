const router = require("express").Router();
const controller = require("../controllers/historiqueController");

router.get("/", controller.getHistorique);

router.get("/personne/:id", controller.getHistoriquePersonne);

module.exports = router;