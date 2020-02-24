import React from "react";
import { imgUrl } from "../../config.json";

const BuyCard = ({ product, index, handleRemove }) => {
  return product.combo === "false" ? (
    <div className="card" key={index}>
      <img className="img" src={imgUrl + product.url[0]} alt="poster" />

      <div className="name">{product.Products}</div>
      <div className="category">{product.Category}</div>
      <div className="price">&#8377;{product.Price}</div>
      <div className="button">
        <button
          className="bu two"
          id={index}
          name={product.id}
          value={product.combo}
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default BuyCard;
