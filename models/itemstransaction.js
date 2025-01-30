'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemsTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ItemsTransaction.belongsTo(models.Transaction, {
        foreignKey: 'transaction_id',
        as: 'itemsToTransaction'
      })
      ItemsTransaction.belongsTo(models.Trolley, {
        foreignKey: 'trolley_id',
        as: 'itemsToTrolley'
      })
    }
  }
  ItemsTransaction.init({
    transaction_id: DataTypes.STRING,
    trolley_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ItemsTransaction',
  });
  return ItemsTransaction;
};