'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryType2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryType2.hasMany(models.ProductCategory, {
        foreignKey: 'product_id',
        as: 'type2ToProductCategory'
      })
      CategoryType2.belongsTo(models.CategoryType1, {
        foreignKey: 'type_1',
        as: 'type2ToType1'
      })
    }
  }
  CategoryType2.init({
    name: DataTypes.STRING,
    type_1: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CategoryType2',
  });
  return CategoryType2;
};