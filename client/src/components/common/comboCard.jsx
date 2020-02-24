import React from "react";
import { imgUrl } from "../../config.json";

const ComboCard = ({ product, handleRemove }) => {
  return product.length !== 0
    ? product.map((product, index) => {
        return (
          <div className="combo-card" key={index}>
            <div key={index}>
              <img
                className="img"
                src={imgUrl + product[0].url[0]}
                alt="poster"
              />

              <div className="name">{product[0].Products}</div>
              <div className="category">{product[0].Category}</div>
              <div className="price">&#8377;{product[0].Price}</div>

              <div className="button">
                <button
                  className="bu two"
                  name={product[0].id}
                  value={product[0].combo}
                  onClick={handleRemove}
                >
                  Remove
                </button>
              </div>
            </div>
            <div key={index}>
              <img
                className="img"
                src={imgUrl + product[1].url[0]}
                alt="poster"
              />

              <div className="name">{product[1].Products}</div>
              <div className="category">{product[1].Category}</div>
              <div className="price">&#8377;{product[1].Price}</div>
            </div>
          </div>
        );
      })
    : "";
};

export default ComboCard;
