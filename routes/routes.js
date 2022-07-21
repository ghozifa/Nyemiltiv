const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", Controller.home); // Home index toko

module.exports = router;