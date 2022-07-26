const { User, UserProduct, Profile, Category, Product } = require("../models");
const { idrFormatter, dateFormatter } = require("../helpers/helper")
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");


class Controller {

    static home(req, res) {
        let notif = req.query.notif;
        const sessionId = req.session.userId;
        const role = req.session.role;
        const search = req.query.search;
        let temp;
        if (search) {
            temp = { [Op.iLike]: `%${search}%` }
        } else {
            temp = { [Op.iLike]: `%%` }
        }
        Product.findAll({
            where: {
                stock: { [Op.gt]: 0 },
                name: temp
            },
            order: [['name', 'asc']]
        })
            .then(result => {
                if (!result.length) {
                    notif = "Item not found"
                }
                res.render('home', { result, idrFormatter, sessionId, notif, role })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static emptyStock(req, res) {
        const sessionId = req.session.userId;
        const role = req.session.role;
        Product.findAll({
            where: { stock: 0 }
        })
            .then(result => {
                res.render('emptyStock', { result, idrFormatter, sessionId, role })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static login(req, res) {
        const error = req.query.error;
        const notif = req.query.notif;
        res.render("login", { error, notif });
    }

    static loginPost(req, res) {
        const { email, password } = req.body;
        let error = [];
        if (!email) {
            error.push("Masukkan email terlebih dahulu");
        }
        if (!password) {
            error.push("Masukkan password terlebih dahulu");
        }
        if (error.length) {
            return res.redirect(`/login?error=${error.join("; ")}`);
        }
        User.findOne({
            where: { email: email }
        })
            .then((user) => {
                const error = "Email atau Password salah";
                if (user) {
                    // compare plain password sama hash password
                    const isPassValid = bcrypt.compareSync(password, user.password);
                    if (isPassValid) {
                        req.session.userId = user.id; // set session id user
                        req.session.role = user.role; // set session role user
                        return res.redirect("/?notif=Berhasil Login");
                    }
                    return res.redirect(`/login?error=${error}`);
                }
                return res.redirect(`/login?error=${error}`);
            })
            .catch(err => {
                res.send(err);
            });
    }

    static daftar(req, res) {
        let error = req.query.error;
        res.render("daftar", { error });
    }

    static daftarPost(req, res) {
        const { email, password, role } = req.body;
        User.create({ email, password, role })
            .then(() => {
                res.redirect("/login?notif=Daftar User Berhasil")
            })
            .catch(err => {
                let error;
                if (err.name == "SequelizeValidationError") {
                    error = err.errors.map(el => {
                        return el.message
                    }).join("; ");
                    res.redirect(`/daftar?error=${error}`);
                } else if (err.name == "SequelizeUniqueConstraintError") {
                    error = err.errors.map(el => {
                        return el.message
                    }).join("; ");
                    res.redirect(`/daftar?error=${error}`);
                } else {
                    res.send(err);
                }
            });
    }

    static food(req, res) {
        const sessionId = req.session.userId;
        const role = req.session.role;
        Category.findByPk(1, {
            include: {
                model: Product,
                order: [['name', 'asc']]
            }
        })
            .then(result => {
                res.render('food', { result, idrFormatter, sessionId, role })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addFood(req, res) {
        const sessionId = req.session.userId;
        const role = req.session.role;
        let error = req.query.error;
        Category.findByPk(1)
            .then(result => {
                res.render('addFood', { result, sessionId, error, role })
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
            });
    }

    static beverage(req, res) {
        const sessionId = req.session.userId;
        const role = req.session.role;
        Category.findByPk(2, {
            include: {
                model: Product,
                order: [['name', 'asc']]
            }
        })
            .then(result => {
                res.render('beverage', { result, idrFormatter, sessionId, role })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addBeverage(req, res) {
        const sessionId = req.session.userId;
        const role = req.session.role;
        Category.findByPk(2)
            .then(result => {
                res.render('addBeverage', { result, sessionId, role })
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
                res.redirect(`/beverage/add?err=${errors}`)
            })
    }

    static productsDetailById(req, res) {
        const sessionId = req.session.userId;
        const role = req.session.role;
        const idProduct = +req.params.id
        Product.findByPk(idProduct, {
            include: Category
        })
            .then(result => {
                res.render('productsDetailById', { result, dateFormatter, idrFormatter, sessionId, role })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editProduct(req, res) {
        const sessionId = req.session.userId;
        const role = req.session.role;
        const idProduct = +req.params.id
        Product.findByPk(idProduct)
            .then(result => {
                res.render('editProduct', { result, dateFormatter, sessionId, role })
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
        const sessionId = req.session.userId;
        const role = req.session.role;
        const errors = req.query.err;
        const idUser = +req.params.id;
        Profile.findByPk(idUser, {
            include: User
        })
            .then(result => {
                if (!result) {
                    result = "Kosong"
                    res.render('profile', { result, errors, sessionId, role })
                } else {
                    res.render('profile', { result, errors, sessionId, role })
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static createProfile(req, res) {
        const sessionId = req.session.userId;
        const role = req.session.role;
        const errors = req.query.err
        res.render('addProfile', { errors, sessionId, role })

    }

    static createProfilePost(req, res) {
        let { firstName, lastName, address, phoneNumber, gender, UserId } = req.body
        Profile.create({ firstName, lastName, address, phoneNumber, gender, UserId })
            .then(result => {
                res.redirect("/")
            })
            .catch(err => {
                let errors = err
                if (err.name == "SequelizeValidationError") {
                    errors = err.errors.map(x => x.message)
                }
                res.redirect(`/profiles/add?err=${errors}`)
            });
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
                if (err.name == "SequelizeValidationError") {
                    errors = err.errors.map(x => x.message)
                }
                res.redirect(`/profiles/add?err=${errors}`)

            });
    }

    static buyProducts(req, res) {
        const idProduct = +req.params.id
        Product.findByPk(idProduct)
            .then((product) => {
                if (!product) throw 'Product not found'
                if (product.stock == 0) throw 'Product empty'
                return product.decrement("stock", { by: 1 })
            })
            .then(result => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static buyProductsFood(req, res) {
        const idProduct = +req.params.id
        Product.findByPk(idProduct)
            .then((product) => {
                if (!product) throw 'Food not found'
                if (product.stock == 0) throw 'Food empty'
                return product.decrement("stock", { by: 1 })
            })
            .then(result => {
                res.redirect('/food')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static buyProductsBeverage(req, res) {
        const idProduct = +req.params.id
        Product.findByPk(idProduct)
            .then((product) => {
                if (!product) throw 'Beverage not found'
                if (product.stock == 0) throw 'Beverage empty'
                return product.decrement("stock", { by: 1 })
            })
            .then(result => {
                res.redirect('/beverage')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err);
                return;
            }
            res.redirect("/?notif=Berhasil Logout");
        });
    }
}

module.exports = Controller;