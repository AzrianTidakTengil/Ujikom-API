'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trolley extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trolley.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'trolleyToUser'
      })
      Trolley.belongsTo(models.Produtcs, {
        foreignKey: 'product_id',
        as: 'trolleyToProduct'
      })
      Trolley.belongsToMany(models.Transaction, {
        through: models.ItemsTransaction,
        as: 'trolleyTotransaction',
        foreignKey: 'trolley_id'
      })
    }
  }
  Trolley.init({
    user_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
    items: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Trolley',
  });
  return Trolley;
};