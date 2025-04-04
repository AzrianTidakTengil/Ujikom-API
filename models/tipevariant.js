'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipeVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TipeVariant.hasMany(models.TipeSubVariant, {
        foreignKey: 'variant_id',
        as: 'variantToSubVariant'
      })
    }
  }
  TipeVariant.init({
    name: DataTypes.STRING,
    shop_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TipeVariant',
  });
  return TipeVariant;
};