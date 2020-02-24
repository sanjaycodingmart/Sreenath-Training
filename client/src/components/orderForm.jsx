import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { apiUrl } from "../config.json";
import { imgUrl } from "../config.json";

class OrderForm extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      Products: "",
      Price: "",
      Category: "",
      Quantity: "",
      url: [],
      fav: ""
    };
  }
  componentDidMount() {
    const Id = this.props.match.params.id;

    axios
      .post(apiUrl + `/order/:id`, {
        Id
      })
      .then(res => {
        let products = res.data;
        this.setState({
          user: products[0].userId,
          id: products[0].id,
          Products: products[0].Product.product,
          Price: products[0].Product.price,
          Category: products[0].Product.category,
          Quantity: products[0].Product.quantity,
          url: products[0].Product.url,
          fav: products[0].Product.fav,
          viewImage: imgUrl + products[0].Product.url[0]
        });
      });
  }
  handleBuy = event => {
    const product = event.target.id;
    let cart = "";
    let table = "";
    let carts = "";
    const decoded = jwt_decode(localStorage.getItem("jwtToken"));
    const userId = decoded.id;

    axios
      .post(apiUrl + `/cartItem/add`, {
        userId,
        product
      })
      .then(res => {
        toast.success("Item Added to cart !", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };
  handleOut = () => {
    toast.error("Item Out of Stock", {
      position: toast.POSITION.TOP_CENTER
    });
  };
  handleImageChange = e => {
    this.setState({ viewImage: e.target.src });
  };
  render() {
    return (
      <div className="Product">
        <ToastContainer autoClose={2000} />
        <div className="thumb-space">
          {this.state.url.map(urls => {
            return (
              <img
                className="thumbnail"
                src={imgUrl + urls}
                width="50px"
                height="50px"
                onMouseOver={this.handleImageChange}
              ></img>
            );
          })}
        </div>
        <img className="viewer" src={this.state.viewImage} alt="" />
        <div className="title">{this.state.Products}</div>
        <div className="Price">&#8377;{this.state.Price}</div>
        <div className="Category">{this.state.Category}</div>
        <div className="Price">Bought By:{this.state.user}</div>
      </div>
    );
  }
}

export default OrderForm;
