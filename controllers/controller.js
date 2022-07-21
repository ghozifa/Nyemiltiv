const { User, UserProduct, Profile, Category } = require("../models");

class Controller {

    static home(req, res) {
        res.render("home");
    }

    static login(req, res) {
        res.render("login");
    }

    static daftar(req, res) {
        res.render("daftar");
    }

    static daftarPost(req, res) {
        const { email, password } = req.body;
        UserProduct.create({ email, password })
        .then(() => {
            res.redirect("/login")
        })
        .catch(err => {
            res.send(err);
        })
    }

}

module.exports = Controller;