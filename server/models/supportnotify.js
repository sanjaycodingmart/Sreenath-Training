'use strict';
module.exports = (sequelize, DataTypes) => {
  const supportnotify = sequelize.define('supportnotify', {
    message: DataTypes.STRING,
    user: DataTypes.STRING,
    seen: DataTypes.BOOLEAN
  }, {});
  supportnotify.associate = function(models) {
    // associations can be defined here
  };
  return supportnotify;
};