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
      Produtcs.hasMany(models.ProductVariant, {
        foreignKey: 'product_id',
        as: 'productToProductVariant'
      })
      Produtcs.hasOne(models.ProductCategory, {
        foreignKey: 'product_id',
        as: 'productToCategory'
      })
    }
  }
  Produtcs.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    condition: DataTypes.STRING,
    length: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Produtcs',
  });
  return Produtcs;
};