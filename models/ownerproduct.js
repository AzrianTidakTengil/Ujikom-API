'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OwnerProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OwnerProduct.belongsTo(models.Produtcs, {
        foreignKey: 'product_id',
        as: 'owner'
      })
      OwnerProduct.belongsTo(models.Store, {
        foreignKey: 'store_id',
        as: 'ownerToStore'
      })
    }
  }
  OwnerProduct.init({
    store_id: DataTypes.STRING,
    product_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OwnerProduct',
  });
  return OwnerProduct;
};