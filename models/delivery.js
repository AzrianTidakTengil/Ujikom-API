'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Delivery.belongsTo(models.LabelDelivery, {
        foreignKey: 'label_id',
        as: 'deliveryToLabel'
      })
      Delivery.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'deliveryToUser'
      })
      Delivery.belongsTo(models.LabelShipment, {
        foreignKey: 'type_id',
        as: 'deliveryToType'
      })
      Delivery.hasOne(models.Transaction, {
        foreignKey: 'shipment_id',
        as: 'deliveryToTransactioin'
      })
      Delivery.belongsTo(models.Address, {
        foreignKey: 'detail',
        as: 'deliveryToAddress'
      })
    }
  }
  Delivery.init({
    label_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    type_label: DataTypes.STRING,
    detail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Delivery',
  });
  return Delivery;
};