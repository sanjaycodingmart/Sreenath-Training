import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import TogetherCard from "./common/togetherCard";
import { apiUrl } from "../config.json";
import { imgUrl } from "../config.json";
class ProductForm extends Component {
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
      .post(apiUrl + `/product/:id`, {
        Id
      })
      .then(res => {
        let products = res.data;
        this.setState({
          id: products[0].id,
          Products: products[0].product,
          Price: products[0].price,
          memPrice: products[0].memPrice,
          Category: products[0].category,
          Quantity: products[0].quantity,
          url: products[0].url,
          fav: products[0].fav,
          canReturn: products[0].canReturn,
          seller: products[0].seller,
          viewImage: imgUrl + products[0].url[0]
        });
      });

    axios.get(apiUrl + `/product/accessory`).then(res => {
      let products = res.data;
      this.setState({
        accessory: {
          id: products[0].id,
          Products: products[0].product,
          Price: products[0].price,
          memPrice: products[0].memPrice,
          Category: products[0].category,
          Quantity: products[0].quantity,
          url: products[0].url,
          fav: products[0].fav,
          canReturn: products[0].canReturn,
          seller: products[0].seller,
          viewImage: imgUrl + products[0].url[0]
        }
      });
    });
  }
  handleBuy = event => {
    const product = event.target.id;
    let cart = "";
    let table = "";
    let carts = "";
    const decoded = jwt_decode(localStorage.getItem("token"));
    const userId = decoded.id;

    axios
      .post(apiUrl + `/cartItem/add`, {
        userId,
        product,
        price: this.state.memPrice,
        combo: "false"
      })
      .then(res => {
        res.data !== "item exits"
          ? toast.success("Item Added to cart !", {
              position: toast.POSITION.TOP_CENTER
            })
          : toast.error("Item Already Exits in cart !", {
              position: toast.POSITION.TOP_CENTER
            });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };
  handleTogetherBuy = async event => {
    const productId = [this.state.id, this.state.accessory.id];
    const productPrice = [
      this.state.memPrice,
      this.state.accessory.memPrice - this.state.accessory.memPrice * 0.15
    ];

    const decoded = jwt_decode(localStorage.getItem("token"));
    const userId = decoded.id;
    let i = 0;

    productId.map(async proId => {
      await axios
        .post(apiUrl + `/cartItem/add`, {
          userId,
          product: proId,
          price: productPrice[i],
          combo: JSON.stringify(this.state.id)
        })
        .then(res => {
          i === 1
            ? res.data !== "item exits"
              ? toast.success("2 Item Added to cart !", {
                  position: toast.POSITION.TOP_CENTER
                })
              : toast.error("Item Already Exits in cart !", {
                  position: toast.POSITION.TOP_CENTER
                })
            : console.log("no");
        })
        .catch(error => {
          this.setState({ error: error });
        });
      i = i + 1;
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
    let user = false;
    if (localStorage.getItem("token")) {
      const decoded = jwt_decode(localStorage.getItem("token"));
      const isAdmin = decoded.isAdmin;
      const isSeller = decoded.isSellerAdmin;
      const isSellerCom = decoded.isSellerCompany;

      if (!isAdmin && !isSeller && !isSellerCom) {
        user = true;
      }
    } else {
      console.log("notoken");
    }
    return (
      <div className="product-cont">
        <div className="Product">
          <div className="product-flex">
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
            <div className="Category">
              {this.state.Category}
              <div>Seller: {this.state.seller}</div>
            </div>
            <div className="Price">
              &#8377;{this.state.memPrice}
              {user ? (
                this.state.Quantity > 0 ? (
                  <div className="buton">
                    <button id={this.state.id} onClick={this.handleBuy}>
                      ADD TO CART
                    </button>
                  </div>
                ) : (
                  <div className="buton-out">
                    <button id={this.state.id} onClick={this.handleOut}>
                      Out Of Stock
                    </button>
                  </div>
                )
              ) : (
                ""
              )}
              {this.state.canReturn ? (
                <div className="return">This product can be Return*</div>
              ) : (
                <div className="return">This product cannot be Returnable*</div>
              )}
            </div>
          </div>
          {user &&
          this.state.Category !== "Accessory" &&
          this.state.accessory ? (
            <div className="combo">
              <h3>Buy together and get upto 20% off</h3>
              <div className="product-flex">
                <TogetherCard product={this.state} />
                <div className="plus">+</div>

                <TogetherCard product={this.state.accessory} />
              </div>
              <div className="product-flex box">
                <div className="together-Ntotal">
                  Normal Price:
                  <div className="line-through">
                    {this.state.Price + this.state.accessory.Price}
                  </div>
                </div>
                <div className="together-Ototal">
                  Offer Price:
                  {this.state.Price +
                    this.state.accessory.Price -
                    this.state.accessory.Price * 0.15}
                </div>
                <div className="to-buton">
                  <button id={this.state.id} onClick={this.handleTogetherBuy}>
                    ADD 2 ITEMS TO CART
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default ProductForm;
