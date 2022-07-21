const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", Controller.home); // Home index toko
router.get("/login", Controller.login); // Login User
router.get("/daftar", Controller.daftar);
router.post("/daftar", Controller.daftarPost);

module.exports = router;