'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produtcs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Produtcs.hasOne(models.OwnerProduct, {
        foreignKey: 'product_id',
        as: 'productToOwner'
      })
      Produtcs.belongsToMany(models.Labels, {
        through: models.LabelProduct,
        foreignKey: 'product_id',
        as: 'productToLabel'
      })
      Produtcs.hasMany(models.Trolley, {
        foreignKey: 'product_id',
        as: 'productToTrolley'
      })
      Produtcs.hasMany(models.ProductsImage, {
        foreignKey: 'product_id',
        as: 'productToImage'
      })
    }
  }
  Produtcs.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Produtcs',
  });
  return Produtcs;
};