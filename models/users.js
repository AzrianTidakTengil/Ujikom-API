'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.Roles, {
        foreignKey: 'role_id',
        as: 'user'
      })
      Users.hasOne(models.Store, {
        foreignKey: 'user_id',
        as: 'userToStore'
      })
      Users.hasMany(models.Trolley, {
        foreignKey: 'user_id',
        as: 'userToTrolley'
      })
      Users.hasMany(models.Transaction, {
        foreignKey: 'user_id',
        as: 'userToTransaction'
      })
      Users.hasMany(models.Address, {
        foreignKey: 'user_id',
        as: 'userToAddress'
      })
      Users.hasOne(models.AddressUser, {
        foreignKey: 'user_id',
        as: 'userHaveAddress'
      })
    }
  }
  Users.init({
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};