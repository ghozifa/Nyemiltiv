'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.UserProduct)
    }
  }
  User.init({
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Email wajib diisi!"
        },
        notEmpty: {
          msg: "Email wajib diisi!"
        },
        isEmail: {
          args: true,
          msg: "Email tidak sesuai format"
        },
      },
      unique: {
        args: "email",
        msg: "Email telah terdaftar, gunakan email lain"
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Password harus diisi!"
        },
        notEmpty: {
          msg: "Password harus diisi!"
        }
      }
    },
    role: {
     allowNull: false, 
     type: DataTypes.STRING,
     validate: {
      notNull: {
        msg: "Silahkan pilih role terlebih dahulu"
      },
      notEmpty: {
        msg: "Silahkan pilih role terlebih dahulu"
      }
     }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  })

  return User;
};