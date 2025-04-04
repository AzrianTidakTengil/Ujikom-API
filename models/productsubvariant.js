'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSubvariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductSubvariant.belongsTo(models.ProductVariant, {
        foreignKey: 'product_variant',
        as: 'subVariantToProduct'
      })
      ProductSubvariant.belongsTo(models.TipeSubVariant, {
        foreignKey: 'subvariant_id',
        as: 'subVariantTosubVariant'
      })
    }
  }
  ProductSubvariant.init({
    product_variant: DataTypes.STRING,
    subvariant_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductSubvariant',
  });
  return ProductSubvariant;
};