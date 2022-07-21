'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
      Product.hasMany(models.UserProduct)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name cant be null'
        },
        notEmpty: {
          msg: 'Name cant be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description cant be null'
        },
        notEmpty: {
          msg: 'Description cant be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price cant be null'
        },
        notEmpty: {
          msg: 'Price cant be empty'
        },
        min: {
          args: [1],
          msg: 'Price must be above 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Stock cant be null'
        },
        notEmpty: {
          msg: 'Stock cant be empty'
        },
        min: {
          args: [1],
          msg: 'Stock must be above 0'
        }
      }
    },
    expiredDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Expired Date cant be null'
        },
        notEmpty: {
          msg: 'Expired Date cant be empty'
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image Url cant be null'
        },
        notEmpty: {
          msg: 'Image Url cant be empty'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category cant be null'
        },
        notEmpty: {
          msg: 'Category cant be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};