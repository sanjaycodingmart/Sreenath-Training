'use strict';
module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('sale', {
    brand: DataTypes.STRING,
    DOS: DataTypes.DATE,
    offer: DataTypes.FLOAT
  }, {});
  sale.associate = function(models) {
    // associations can be defined here
  };
  return sale;
};