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
      Payment.hasOne(models.Transaction, {
        foreignKey: 'payment_id',
        as: 'paymentToTransaction'
      })
    }
  }
  Payment.init({
    method_id: DataTypes.STRING,
    subtotal: DataTypes.INTEGER,
    coupon_payment: DataTypes.INTEGER,
    fare: DataTypes.INTEGER,
    coupon_fare: DataTypes.INTEGER,
    insurance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};