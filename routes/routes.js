const Controller = require("../controllers/controller");
const router = require("express").Router();

// INDEX
router.get("/", Controller.home); // Home index toko
router.get("/emptyStock", Controller.emptyStock); // cek stock kosong

// LOGIN
router.get("/login", Controller.login); // page form login
router.post("/login", Controller.loginPost); // login

// DAFTAR USER
router.get("/daftar", Controller.daftar); // daftar User
router.post("/daftar", Controller.daftarPost); // Input data Daftar User

// SET MIDDLEWARE SESSION
router.use(function (req, res, next) {
    if (!req.session.userId) {
        const error = "Silahkan login terlebih dahulu";
        return res.redirect(`/login?error=${error}`);
    }
    next();
});

// FOOD 
router.get("/food", Controller.food); // Product with categories food
router.get("/food/add", Controller.addFood); // Product with categories food
router.post("/food/add", Controller.addFoodPost); // form add product with categories food
router.get("/products/:id/buyFood", Controller.buyProductsFood); // Buy product food by id

// BEVERAGES
router.get("/beverage", Controller.beverage); // add product with categories beverage
router.get("/beverage/add", Controller.addBeverage); //form add product with categories beverage
router.post("/beverage/add", Controller.addBeveragePost); // add product with categories beverage
router.get("/products/:id/buyBeverage", Controller.buyProductsBeverage); // Buy product beverage by id

// PRODUCT
router.get("/products/:id", Controller.productsDetailById); // Product with detail include category
router.get("/products/:id/edit", Controller.editProduct); // form edit product by id 
router.post("/products/:id/edit", Controller.editProductPost); // edit product by id 

// DELETE
router.get("/products/:id/deleteFood", Controller.deleteFood); // delete food by id 
router.get("/products/:id/deleteBeverage", Controller.deleteBeverage); // delete beverage by id 

// PROFILE USER
router.get("/profiles/add", Controller.createProfile); // Create profile1
router.post("/profiles/add", Controller.createProfilePost); // Create profile1
router.get("/profiles/:id", Controller.profileByUserId); // Detail profils with form edit profile
router.post("/profiles/:id/edit", Controller.editProfile); // Edit profile

// BUY
router.get("/products/:id/buy", Controller.buyProducts); // Buy product by id

// LOGOUT
router.get("/logout", Controller.logout);


module.exports = router;