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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name cant be null'
        },
        notEmpty: {
          msg: 'First name cant be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name cant be null'
        },
        notEmpty: {
          msg: 'Last name cant be empty'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Address cant be null'
        },
        notEmpty: {
          msg: 'Address cant be empty'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Phone number cant be null'
        },
        notEmpty: {
          msg: 'Phone number cant be empty'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Gender cant be null'
        },
        notEmpty: {
          msg: 'Gender cant be empty'
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
    modelName: 'Profile',
    hooks: {
      beforeCreate(profile, options) {
        profile.UserId = profile.id
      }
    }
  });
  return Profile;
};