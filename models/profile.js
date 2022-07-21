'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Firstname cannot empty"
        },
        notNull: {
          msg: "Firstname cannot empty"
        }
      }
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Lastname cannot empty"
        },
        notNull: {
          msg: "Lastname cannot empty"
        }
      }
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Address cannot empty"
        },
        notNull: {
          msg: "Address cannot empty"
        }
      }
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Phone number cannot empty"
        },
        notNull: {
          msg: "Phone number cannot empty"
        }
      }
    },
    gender: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please choose your gender"
        },
        notNull: {
          msg: "Please choose your gender"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId cant be null'
        },
        notEmpty: {
          msg: 'UserId cant be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile'
  });
  return Profile;
};