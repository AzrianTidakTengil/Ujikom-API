'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LabelShipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LabelShipment.hasMany(models.Delivery, {
        foreignKey: 'label_id',
        as:'typeOrDelivery'
      })
    }
  }
  LabelShipment.init({
    name: DataTypes.STRING,
    min_price: DataTypes.INTEGER,
    max_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LabelShipment',
  });
  return LabelShipment;
};