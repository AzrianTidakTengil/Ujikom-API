'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductCategory.belongsTo(models.Produtcs, {
        foreignKey: 'product_id',
        as: 'productCategoryToProduct'
      })
      ProductCategory.belongsTo(models.CategoryType1, {
        foreignKey: 'type_1',
        as: 'productCategoryToCategory1'
      })
      ProductCategory.belongsTo(models.CategoryType2, {
        foreignKey: 'type_2',
        as: 'productCategoryToCategory2'
      })
      ProductCategory.belongsTo(models.CategoryType3, {
        foreignKey: 'type_3',
        as: 'productCategoryToCategory3'
      })
    }
  }
  ProductCategory.init({
    product_id: DataTypes.STRING,
    type_1: DataTypes.STRING,
    type_2: DataTypes.STRING,
    type_3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductCategory',
  });
  return ProductCategory;
};