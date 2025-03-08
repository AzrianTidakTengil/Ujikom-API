'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AddressUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AddressUser.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'haveUser'
      })
      AddressUser.belongsTo(models.Address, {
        foreignKey: 'default',
        as: 'defaultAddress'
      })
      AddressUser.belongsTo(models.Address, {
        foreignKey: 'selected',
        as: 'selectedAddress'
      })
    }
  }
  AddressUser.init({
    user_id: DataTypes.STRING,
    default: DataTypes.STRING,
    selected: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AddressUser',
  });
  return AddressUser;
};