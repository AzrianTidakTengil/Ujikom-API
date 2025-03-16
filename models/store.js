'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'store'
      })
      Store.hasOne(models.OwnerProduct, {
        foreignKey: 'store_id',
        as: 'storeToOwner'
      })
      Store.hasMany(models.ListLabelStore, {
        foreignKey: 'store_id',
        as: 'storeToList'
      })
      Store.hasOne(models.WorkOperation, {
        foreignKey: 'store_id',
        as: 'storeToOperation'
      })
    }
  }
  Store.init({
    user_id: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    postcode: DataTypes.STRING,
    category_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};