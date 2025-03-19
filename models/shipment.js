'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shipment.belongsTo(models.LabelShipment, {
        foreignKey: 'label_id',
        as: 'shipmentToLabel'
      })
      Shipment.belongsTo(models.Delivery, {
        foreignKey: 'delivery_id',
        as: 'shipmentToDelivery'
      })
      Shipment.hasOne(models.Transaction, {
        foreignKey: 'shipment_id',
        as: 'shipmentToTransaction'
      })
    }
  }
  Shipment.init({
    label_id: DataTypes.STRING,
    delivery_id: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Shipment',
  });
  return Shipment;
};