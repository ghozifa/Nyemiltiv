const { User, UserProduct, Profile, Category, Product } = require("../models");
const { idrFormatter, dateFormatter } = require("../helpers/helper")

class Controller {

    static home(req, res) {
        Product.findAll()
            .then(result => {
                res.render('home', { result, idrFormatter })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static food(req, res) {
        Category.findByPk(1, {
            include: Product
        })
            .then(result => {
                res.render('food', { result, idrFormatter })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addFood(req, res) {
        Category.findByPk(1)
            .then(result => {
                res.render('addFood', { result })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addFoodPost(req, res) {
        let { name, description, price, stock, expiredDate, imgUrl, CategoryId } = req.body
        Product.create({ name, description, price, stock, expiredDate, imgUrl, CategoryId })
            .then(result => {
                res.redirect("/food")
            })
            .catch(err => {
                let errors = err
                if (err.name == 'SequelizeValidationError') {
                    errors = err.errors.map(x => x.message)
                }
                res.redirect(`/food/add?err=${errors}`)
            })
    }

    static addBeverage(req, res) {
        Category.findByPk(2)
            .then(result => {
                res.render('addBeverage', { result })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addBeveragePost(req, res) {
        let { name, description, price, stock, expiredDate, imgUrl, CategoryId } = req.body
        Product.create({ name, description, price, stock, expiredDate, imgUrl, CategoryId })
            .then(result => {
                res.redirect("/beverage")
            })
            .catch(err => {
                let errors = err
                if (err.name == 'SequelizeValidationError') {
                    errors = err.errors.map(x => x.message)
                }
                res.redirect(`/food/add?err=${errors}`)
            })
    }

    static beverage(req, res) {
        Category.findByPk(2, {
            include: Product
        })
            .then(result => {
                res.render('beverage', { result, idrFormatter })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static productsDetailById(req, res) {
        const idProduct = +req.params.id
        Product.findByPk(idProduct, {
            include: Category
        })
            .then(result => {
                res.render('productsDetailById', { result, dateFormatter, idrFormatter })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editProduct(req, res) {
        const idProduct = +req.params.id
        Product.findByPk(idProduct)
            .then(result => {
                res.render('editProduct', { result, dateFormatter })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editProductPost(req, res) {
        const idProduct = +req.params.id
        let { name, description, price, stock, expiredDate, imgUrl, CategoryId } = req.body
        Product.update({ name, description, price, stock, expiredDate, imgUrl, CategoryId }, {
            where: {
                id: idProduct
            }
        })
            .then(result => {
                res.redirect(`/products/${idProduct}`)
            })
            .catch(err => {
                let errors = err
                if (err.name == 'SequelizeValidationError') {
                    errors = err.errors.map(x => x.message)
                }
                res.redirect(`/products/${idProduct}/edit?err=${errors}`)
            })
    }

    static deleteFood(req, res) {
        const idProduct = +req.params.id
        Product.destroy({
            where: {
                id: idProduct
            }
        })
            .then(result => {
                res.redirect(`/food`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deleteBeverage(req, res) {
        const idProduct = +req.params.id
        Product.destroy({
            where: {
                id: idProduct
            }
        })
            .then(result => {
                res.redirect(`/Beverage`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static profileByUserId(req, res) {
        let errors = req.query.err
        const idUser = +req.params.id
        Profile.findByPk(idUser, {
            include: User
        })
            .then(result => {
                if (!result) {
                    result = "Kosong"
                    res.render('profile', { result, errors })
                } else {
                    res.render('profile', { result, errors })
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static createProfile(req, res) {
        let { firstName, lastName, address, phoneNumber, gender, UserId } = req.body
        Profile.create({ firstName, lastName, address, phoneNumber, gender, UserId })
            .then(result => {
                res.redirect("/")
            })
            .catch(err => {
                let errors = err
                if (err.name == 'SequelizeValidationError') {
                    errors = err.errors.map(x => x.message)
                }
                res.redirect(`/profiles/add?err=${errors}`)
            })
    }

    static editProfile(req, res) {
        const idProfile = +req.params.id
        let { firstName, lastName, address, phoneNumber, gender } = req.body
        Profile.update({ firstName, lastName, address, phoneNumber, gender }, {
            where: {
                id: idProfile
            }
        })
            .then(result => {
                res.redirect(`/profiles/${idProfile}`)
            })
            .catch(err => {
                let errors = err
                if (err.name == 'SequelizeValidationError') {
                    errors = err.errors.map(x => x.message)
                }
                res.redirect(`/profiles/add?err=${errors}`)
            })
    }

    static buyProducts(req, res) {

    }


    static login(req, res) {
        res.render("login");
    }

    static daftar(req, res) {
        res.render("daftar");
    }

    static daftarPost(req, res) {
        const { email, password, role } = req.body;
        UserProduct.create({ email, password, role })
            .then(() => {
                res.redirect("/login")
            })
            .catch(err => {
                res.send(err);
            })
    }

}

module.exports = Controller;