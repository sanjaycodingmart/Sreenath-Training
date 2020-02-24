'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    message: DataTypes.STRING,
    user: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  }, {});
  chat.associate = function(models) {
    // associations can be defined here
  };
  return chat;
};