import React from "react";
const SlideCard = product => {
  return (
    <div className="Slide-card" key={product.id}>
      <div className="name">{product.Products}</div>
      <div className="category">{product.Category}</div>
      <div className="price">&#8377;{product.Price}</div>
    </div>
  );
};

export default SlideCard;
