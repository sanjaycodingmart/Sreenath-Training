import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import BuyCard from "./common/buyCard";
import ComboCard from "./common/comboCard";
import Fav from "./common/fav";
import { apiUrl } from "../config.json";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      combo: [],
      wish: [],
      total: 0,

      name: "",
      street: "",
      city: "",
      pin: ""
    };
  }
  async componentDidMount() {
    const decoded = jwt_decode(localStorage.getItem("token"));
    const userId = decoded.id;
    await axios
      .post(apiUrl + `/cartItem`, {
        userId
      })
      .then(res => {
        let products = res.data;
        let newState = [];
        let combo = [];
        for (let product in products) {
          if (products[product].combo === "false") {
            newState.push({
              id: products[product].Product.id,
              Products: products[product].Product.product,
              Price: products[product].price,
              Category: products[product].Product.category,
              Quantity: products[product].Product.quantity,
              url: products[product].Product.url,
              fav: products[product].Product.fav,
              combo: products[product].combo
            });
          } else {
            combo.push({
              id: products[product].Product.id,
              Products: products[product].Product.product,
              Price: products[product].price,
              Category: products[product].Product.category,
              Quantity: products[product].Product.quantity,
              url: products[product].Product.url,
              fav: products[product].Product.fav,
              combo: products[product].combo
            });
          }
        }
        const group = (arr, key) => {
          return [
            ...arr
              .reduce(
                (acc, o) => acc.set(o[key], (acc.get(o[key]) || []).concat(o)),
                new Map()
              )
              .values()
          ];
        };
        const result = group(combo, "combo");

        this.setState({
          products: newState,
          combo: result
        });
        this.addTotal();
      })
      .catch(error => {
        console.log(error);
      });
  }

  addTotal = () => {
    let proLen = this.state.products.length;
    let product = this.state.products;

    let total = 0;
    for (let i = 0; i < proLen; i++) {
      let price = JSON.parse(product[i].Price);
      total = total + price;
    }
    this.setState({ total });
  };
  handleRemove = event => {
    let index = event.target.id;

    let product = event.target.name;

    let combo = event.target.value;
    let prod = this.state.products;

    // this.addQuant(product);
    this.deleteCart(product, combo);
    prod.splice(index, 1);
    this.setState({
      products: prod
    });
    this.addTotal();
  };

  deleteCart = (product, combo) => {
    let cart = "";
    let table = "";
    let carts = "";

    const decoded = jwt_decode(localStorage.getItem("token"));
    const userId = decoded.id;
    axios
      .post(apiUrl + `/cartItem/delete`, {
        userId,
        product,
        combo
      })
      .then(res => {
        this.addTotal();

        toast.warn("Item Removed !", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });
    if (combo !== "false") {
      this.componentDidMount();
    }
  };
  handleFinish = async () => {
    this.props.history.push("/payment");
  };
  render() {
    return (
      <div>
        <div className="main">
          <div className="container-cart">
            <ToastContainer autoClose={2000} />
            <center>{this.state.error1}</center>
            {this.state.products.length !== 0
              ? this.state.products.map((product, index) => {
                  return (
                    <BuyCard
                      product={product}
                      index={index}
                      handleRemove={this.handleRemove}
                    />
                  );
                })
              : ""}
            <ComboCard
              product={this.state.combo}
              handleRemove={this.handleRemove}
            />
            {this.state.products.length === 0 &&
            this.state.combo.length === 0 ? (
              <h3>Empty Cart</h3>
            ) : (
              ""
            )}
          </div>
        </div>{" "}
        {this.state.total !== 0 ? (
          <div className="total-nav">
            <div className="total">
              &#8377;{this.state.total}
              <button className="cart-but" onClick={this.handleFinish}>
                Proceed To Pay
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Cart;
