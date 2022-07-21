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

    static profileByUserId(req, res) {
        const idUser = +req.params.id
        Profile.findByPk(idUser, {
            include: User
        })
            .then(result => {
                res.render('profile', { result })
            })
            .catch(err => {
                res.send(err)
            })
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