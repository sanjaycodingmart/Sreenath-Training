import React from "react";
import { useState } from "react";
import { imgUrl } from "../../config.json";
const Card = product => {
  return (
    <div
      className="card"
      style={{
        transform: product.compare.includes(JSON.stringify(product.product.id))
          ? "scale(1.1)"
          : ""
      }}
      key={product.index}
    >
      {product.pro.length >= 2 ? (
        <a
          id={product.index}
          name={product.product.id}
          onClick={product.handleAdd}
        >
          <img
            className="img"
            name={product.product.id}
            src={imgUrl + product.product.url[0]}
            alt="poster"
          />
        </a>
      ) : (
        <img
          className="img"
          src={imgUrl + product.product.url[0]}
          alt="poster"
        />
      )}
      <div className="fav">
        <button onClick={product.handleFavDelete}>
          <i
            className="material-icons"
            id={product.product.id}
            value={product.product.id}
          >
            delete
          </i>
        </button>
      </div>

      <div className="name">{product.product.Products}</div>
      <div className="category">{product.product.Category}</div>
      <div>
        <div className="price-line">Normal &#8377;{product.product.Price}</div>
        <div className="price">Plus &#8377;{product.product.memPrice}</div>
      </div>
      {product.pro.length >= 2 && product.compare.length >= 1 ? (
        <div className="button">
          {/* {product.compare.includes(JSON.stringify(product.product.id)) ? ( */}
          <a
            className="bu two"
            id={product.index}
            name={product.product.id}
            onClick={product.handleAdd}
          >
            <p>
              {product.compare.includes(JSON.stringify(product.product.id))
                ? `Remove`
                : `Compare`}
            </p>
          </a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Card;
