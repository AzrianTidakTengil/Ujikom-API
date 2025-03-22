'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AddressShop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AddressShop.hasOne(models.Store, {
        foreignKey: 'address',
        as: 'addressToShop'
      })
    }
  }
  AddressShop.init({
    address: DataTypes.STRING,
    district: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longtitude: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AddressShop',
  });
  return AddressShop;
};