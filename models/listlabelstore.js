'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListLabelStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListLabelStore.belongsTo(models.LabelStore, {
        foreignKey: 'label_id',
        as: 'listToLabel'
      })
      ListLabelStore.belongsTo(models.Store, {
        foreignKey: 'store_id',
        as: 'listToStore'
      })
    }
  }
  ListLabelStore.init({
    store_id: DataTypes.STRING,
    label_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ListLabelStore',
  });
  return ListLabelStore;
};