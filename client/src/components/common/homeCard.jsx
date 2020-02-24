import React from "react";
import { Link } from "react-router-dom";
import Img from "react-image";
import spinner from "../../images/Spinner.gif";
import jwt_decode from "jwt-decode";
import DateCountdown from "react-date-countdown-timer";
import { imgUrl } from "../../config.json";

import Fav from "./fav";
const HomeCard = props => {
  let plus;
  let sales = false;
  let saleStart = false;
  let saleBrand;
  if (props.sale) {
    let sale = props.sale;
    saleBrand = props.sale[0].brand;
    let saleDate = new Date(props.sale[0].DOS);
    let nowDate = new Date();
    let newDate = saleDate - new Date();
    if (newDate < 3600000) {
      sales = true;
    }
    if (newDate === 0) {
      saleStart = true;
    }
  }
  if (localStorage.getItem("token")) {
    const decoded = jwt_decode(localStorage.getItem("token"));
    plus = decoded.plusMember;
  } else {
    plus = false;
  }
  return (
    <div className="card" key={props.product.id}>
      <div className="fav">
        <button className="fav-bu" onClick={props.handleFav}>
          <Fav
            id={props.product.id}
            value={props.product.fav}
            onClick={props.handleFav}
          ></Fav>
        </button>
      </div>

      <Link className="Links" to={`product/${props.product.id}`}>
        <div>
          <Img
            className="img"
            src={imgUrl + props.product.url[0]}
            loader={<img src={spinner} width="120px" height="180px" />}
            unloader={<img src={spinner} width="120px" height="200px" />}
          />
          {/* <img className="img" src={props.product.url} alt="poster" /> */}
          <div className="name">{props.product.Products}</div>
          <div className="category">{props.product.Category}</div>
        </div>
      </Link>
      {plus ? (
        <div>
          <div className="price-line">Normal &#8377;{props.product.Price}</div>
          <div className="price">Plus &#8377;{props.product.memPrice}</div>
        </div>
      ) : (
        <Link className="Links" to="/becomeplus">
          <div>
            <div className="price">Normal &#8377;{props.product.Price}</div>
            <div className="price">Plus &#8377;{props.product.memPrice}</div>
          </div>
        </Link>
      )}
      {sales && saleStart && props.product.Brand === saleBrand ? (
        <div className="Card-count">
          <DateCountdown dateTo={props.sale[0].DOS} />
        </div>
      ) : props.product.Quantity > 0 ? (
        <div className="button">
          <a
            name={props.product.memPrice}
            className="bu two"
            id={props.product.id}
            value={props.product.memPrice}
            onClick={props.handleBuy}
          >
            ADD TO CART
          </a>
        </div>
      ) : (
        <div className="button-out">
          <a id={props.product.id} onClick={props.handleOut}>
            Out Of Stock
          </a>
        </div>
      )}
    </div>
  );
};

export default HomeCard;
