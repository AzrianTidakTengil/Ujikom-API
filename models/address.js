'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.Users, {
        as: 'addressToUser',
        foreignKey: 'user_id'
      })
      Address.hasOne(models.AddressUser, {
        foreignKey: 'selected',
        as: 'selectedAddressUser'
      })
      Address.hasOne(models.AddressUser, {
        foreignKey: 'default',
        as: 'defaultAddressUser'
      })
      Address.hasMany(models.Delivery, {
        foreignKey: 'detail',
        as: 'addressToDelivery'
      })
    }
  }
  Address.init({
    user_id: DataTypes.STRING,
    name: DataTypes.STRING,
    receiver: DataTypes.STRING,
    address: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    telephone: DataTypes.STRING,
    country: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    notes: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longtitude: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};