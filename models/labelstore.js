'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LabelStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LabelStore.hasMany(models.ListLabelStore, {
        foreignKey: 'label_id',
        as: 'labelToList'
      })
    }
  }
  LabelStore.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'LabelStore',
  });
  return LabelStore;
};