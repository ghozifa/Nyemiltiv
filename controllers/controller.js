const { User, UserProduct, Profile, Category, Product } = require("../models");
const { idrFormatter, dateFormatter } = require("../helpers/helper")
const bcrypt = require("bcryptjs");


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
        let error = req.query.error;
        res.render("login", { error });
    }

    static loginPost(req, res) {
        const { email, password } = req.body;
        let error = [];
        if(!email) {
            error.push ("Masukkan email terlebih dahulu");
        }
        if(!password) {
            error.push ("Masukkan password terlebih dahulu");
        }
        if(error.length) {
            return res.redirect(`/login?error=${error.join("; ")}`);
        }
        User.findOne({ 
            where: { email: email }
        })
        .then((user) => { 
            const error = "Email atau Password salah";  
            if(user) {
                // compare plain password sama hash password
                const isPassValid = bcrypt.compareSync(password, user.password);
                if(isPassValid) {
                    return res.redirect("/");
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
            res.redirect("/login")
        })
        .catch(err => {
            let error;
            if(err.name == "SequelizeValidationError") {
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

}

module.exports = Controller;