'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductVariant.belongsTo(models.TipeVariant, {
        foreignKey: 'variant_id',
        as: 'productVariantToVariant'
      })
      ProductVariant.belongsTo(models.Produtcs, {
        foreignKey: 'product_id',
        as: 'productVariantToProduct'
      })
      ProductVariant.hasMany(models.ProductSubvariant, {
        foreignKey: 'subvariant_id',
        as: 'productVariantToSubVariant'
      })
    }
  }
  ProductVariant.init({
    product_id: DataTypes.STRING,
    variant_id: DataTypes.STRING,
    price: DataTypes.INTEGER,
    minimum_purchase: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    weight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductVariant',
  });
  return ProductVariant;
};