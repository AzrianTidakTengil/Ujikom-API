'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryType1 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryType1.hasMany(models.ProductCategory, {
        foreignKey: 'product_id',
        as: 'type1ToProductCategory'
      })
    }
  }
  CategoryType1.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CategoryType1',
  });
  return CategoryType1;
};