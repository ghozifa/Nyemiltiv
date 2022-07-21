const { User, UserProduct, Profile, Category } = require("../models");
const bcrypt = require("bcryptjs");

class Controller {

    static home(req, res) {
        res.render("home");
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