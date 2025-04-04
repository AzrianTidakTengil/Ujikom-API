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
      ProductSubvariant.belongsTo(models.Produtcs, {
        foreignKey: 'product_id',
        as: 'subVariantToProduct'
      })
      ProductSubvariant.belongsTo(models, {
        foreignKey: 'variant_id',
        as: 'subVariantToVariant'
      })
      ProductSubvariant.belongsTo(models, {
        foreignKey: 'subvariant_id',
        as: 'subVariantTosubVariant'
      })
    }
  }
  ProductSubvariant.init({
    product_id: DataTypes.STRING,
    variant_id: DataTypes.STRING,
    subvariant_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductSubvariant',
  });
  return ProductSubvariant;
};