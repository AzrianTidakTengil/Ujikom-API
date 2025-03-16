'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkOperation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WorkOperation.belongsTo(models.Store, {
        foreignKey: 'store_id',
        as: 'operationToStore'
      })
    }
  }
  WorkOperation.init({
    store_id: DataTypes.STRING,
    monday: DataTypes.STRING,
    tuesday: DataTypes.STRING,
    weknesday: DataTypes.STRING,
    thursday: DataTypes.STRING,
    friday: DataTypes.STRING,
    saturday: DataTypes.STRING,
    sunday: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WorkOperation',
  });
  return WorkOperation;
};