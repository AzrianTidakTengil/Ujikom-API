'use strict';
const { mode } = require('crypto-js');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LabelProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LabelProduct.belongsTo(models.Produtcs, {
        foreignKey: 'product_id',
        as: 'label'
      })
      LabelProduct.belongsTo(models.Labels, {
        foreignKey: 'label_id',
        as: 'LabelProduct'
      })
    }
  }
  LabelProduct.init({
    product_id: DataTypes.STRING,
    label_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LabelProduct',
  });
  return LabelProduct;
};