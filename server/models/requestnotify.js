'use strict';
module.exports = (sequelize, DataTypes) => {
  const RequestNotify = sequelize.define('RequestNotify', {
    companyName: DataTypes.STRING,
    sellerName: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    contact: DataTypes.STRING
  }, {});
  RequestNotify.associate = function(models) {
    // associations can be defined here
  };
  return RequestNotify;
};