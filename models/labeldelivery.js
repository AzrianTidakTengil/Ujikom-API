'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LabelDelivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LabelDelivery.hasMany(models.Delivery, {
        foreignKey: 'label_id',
        as: 'labelToDelivery'
      })
    }
  }
  LabelDelivery.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LabelDelivery',
  });
  return LabelDelivery;
};