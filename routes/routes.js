const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", Controller.home); // Home index toko
router.get("/login", Controller.login); // Login User
router.post("/login", Controller.loginPost); // login
router.get("/daftar", Controller.daftar); // daftar User
router.post("/daftar", Controller.daftarPost); // Input data Daftar User

module.exports = router;