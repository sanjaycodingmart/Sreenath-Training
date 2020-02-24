'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReturnNotify = sequelize.define('ReturnNotify', {
    userId: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    transId: DataTypes.STRING,
    reason: DataTypes.STRING,
    seller: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  ReturnNotify.associate = function(models) {
    // associations can be defined here
  };
  return ReturnNotify;
};