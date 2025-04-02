'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipeSubVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TipeSubVariant.belongsTo(models.TipeVariant, {
        foreignKey: 'variant_id',
        as: 'subVariantToVariant'
      })
    }
  }
  TipeSubVariant.init({
    name: DataTypes.STRING,
    variant_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TipeSubVariant',
  });
  return TipeSubVariant;
};