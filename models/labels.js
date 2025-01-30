'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Labels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Labels.hasMany(models.LabelProduct, {
        foreignKey: 'label_id',
        as: 'label'
      })
    }
  }
  Labels.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Labels',
  });
  return Labels;
};