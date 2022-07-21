const { User, UserProduct, Profile, Category } = require("../models");

class Controller {

    static home(req, res) {
        res.render("home");
    }

}

module.exports = Controller;