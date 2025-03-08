'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.hasOne(models.Transaction, {
        foreignKey: 'payment_id',
        as: 'paymentToTransaction'
      })
    }
  }
  Payment.init({
    order_id: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    subtype: DataTypes.STRING,
    payment_code: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};