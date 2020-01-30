"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      product: DataTypes.STRING,
      category: DataTypes.STRING,
      price: DataTypes.FLOAT,
      quantity: DataTypes.INTEGER,
      url: DataTypes.ARRAY(DataTypes.STRING),
      fav: DataTypes.BOOLEAN,
      furl: DataTypes.STRING
    },
    {}
  );
  Product.associate = function(models) {
    Product.hasMany(models.Cart, { foreignKey: "productId" });
    // associations can be defined here
  };
  return Product;
};
