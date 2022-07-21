const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", Controller.home); // Home index toko
router.get("/login", Controller.login); // page form login
router.post("/login", Controller.loginPost); // login
router.get("/daftar", Controller.daftar); // daftar User
router.post("/daftar", Controller.daftarPost); // Input data Daftar User
router.get("/food", Controller.food); // Product with categories food
router.get("/beverage", Controller.beverage); // Product with categories beverage
router.get("/products/:id", Controller.productsDetailById); // Product with detail include category
router.post("/profiles/add", Controller.createProfile); // Create profile
router.get("/profiles/:id", Controller.profileByUserId); // Detail profils with form edit profile
router.post("/profiles/:id/edit", Controller.editProfile); // Edit profile
router.get("/products/:id/buy", Controller.buyProducts); // Buy product by id


module.exports = router;