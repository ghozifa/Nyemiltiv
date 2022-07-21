const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", Controller.home); // Home index toko

router.get("/login", Controller.login); // Login User

router.get("/daftar", Controller.daftar);

router.post("/daftar", Controller.daftarPost);

router.get("/food", Controller.food); // Product with categories food

router.get("/food/add", Controller.addFood); // Product with categories food

router.post("/food/add", Controller.addFoodPost); // form add product with categories food

router.get("/beverage", Controller.beverage); // add product with categories beverage

router.get("/beverage/add", Controller.addBeverage); //form add product with categories beverage

router.post("/beverage/add", Controller.addBeveragePost); // add product with categories beverage

router.get("/products/:id", Controller.productsDetailById); // Product with detail include category

router.get("/products/:id/edit", Controller.editProduct); // form edit product by id 

router.post("/products/:id/edit", Controller.editProductPost); // edit product by id 

router.get("/products/:id/deleteFood", Controller.deleteFood); // delete food by id 

router.get("/products/:id/deleteBeverage", Controller.deleteBeverage); // delete beverage by id 

router.post("/profiles/add", Controller.createProfile); // Create profile

router.get("/profiles/:id", Controller.profileByUserId); // Detail profils with form edit profile

router.post("/profiles/:id/edit", Controller.editProfile); // Edit profile

router.get("/products/:id/buy", Controller.buyProducts); // Buy product by id

module.exports = router;