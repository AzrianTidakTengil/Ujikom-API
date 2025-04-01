'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductsImage.belongsTo(models.Produtcs, {
        foreignKey: 'product_id',
        as: 'imageToProduct'
      })
    }
  }
  ProductsImage.init({
    product_id: DataTypes.STRING,
    public_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductsImage',
  });
  return ProductsImage;
};