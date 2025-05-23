'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'transactionToUser'
      })
      Transaction.belongsToMany(models.Trolley, {
        through: models.ItemsTransaction,
        as: 'transactionToTrolley',
        foreignKey: 'transaction_id'
      })
      Transaction.belongsTo(models.Shipment, {
        foreignKey: 'shipment_id',
        as: 'transactionToShipment'
      })
      Transaction.belongsTo(models.Payment, {
        foreignKey:'payment_id',
        as: 'transactionToPayment'
      })
    }
  }
  Transaction.init({
    user_id: DataTypes.STRING,
    shipment_id: DataTypes.STRING,
    payment_id: DataTypes.STRING,
    total_price: DataTypes.STRING,
    payment_type: DataTypes.STRING,
    subtype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};