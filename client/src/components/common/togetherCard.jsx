import React from "react";
import { imgUrl } from "../../config.json";
const TogetherCard = product => {
  return (
    <div className="together-card" key={product.index}>
      <img
        className="to-img"
        src={imgUrl + product.product.url[0]}
        alt="poster"
      />

      <div className="name">{product.product.Products}</div>
      <div className="category">{product.product.Category}</div>
      <div className="price">&#8377;{product.product.memPrice}</div>
    </div>
  );
};

export default TogetherCard;
