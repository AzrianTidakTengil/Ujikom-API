'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryType3 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryType3.hasMany(models.ProductCategory, {
        foreignKey: 'product_id',
        as: 'type3ToProductCategory'
      })
      CategoryType3.belongsTo(models.CategoryType2, {
        foreignKey: 'type_2',
        as: 'type3ToType2'
      })
    }
  }
  CategoryType3.init({
    name: DataTypes.STRING,
    type_2: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CategoryType3',
  });
  return CategoryType3;
};