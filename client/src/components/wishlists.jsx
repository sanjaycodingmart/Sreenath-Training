import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Card from "./common/card";
import CompareModal from "./compareModal";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../config.json";
class Cart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      compare: [],
      total: 0
    };
  }
  async componentDidMount() {
    const decoded = jwt_decode(localStorage.getItem("token"));
    const userId = decoded.id;
    await axios
      .post(apiUrl + `/favItem`, {
        userId
      })
      .then(res => {
        let products = res.data;
        let newState = [];
        for (let product in products) {
          newState.push({
            id: products[product].id,
            Products: products[product].product,
            Price: products[product].price,
            memPrice: products[product].memPrice,
            Category: products[product].category,
            Quantity: products[product].quantity,
            url: products[product].url,
            fav: products[product].fav
          });
        }
        this.setState({
          products: newState
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }
  handleFavDelete = async event => {
    let favorite = event.target.id;

    let fav = "";
    let table = "";
    let favs = "";
    let index = "";
    let pro = this.state.products;
    const decoded = jwt_decode(localStorage.getItem("token"));
    const userId = decoded.id;
    await axios
      .post(apiUrl + `/favItem/delete`, {
        userId,
        favorite
      })
      .then(res => {
        for (let i = 0; i < pro.length; i++) {
          if (favorite == pro[i].id) {
            index = i;
          }
        }

        let pros = this.state.products;
        pros[index].fav = false;
        this.setState({ products: pros });
        toast.warn("Item Removed from Wishlist !", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });
    this.componentDidMount();
  };

  handleAdd = event => {
    let compare = this.state.compare;

    let index = compare.indexOf(event.target.name);
    if (compare.indexOf(event.target.name) === -1) {
      compare.push(event.target.name);
      toast.success("Item Added in Compare List !", {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      compare.splice(index, 1);

      toast.warn("Item Removed from Compare List !", {
        position: toast.POSITION.TOP_CENTER
      });
    }

    this.setState({ compare });
  };
  handleRemove = event => {
    console.log("deleted");
  };
  handleCompare = () => {
    this.setState({ compare: [] });
  };
  render() {
    return (
      <div>
        <ToastContainer autoClose={2000} />
        <div className="main">
          <div className="container-cart">
            <center>{this.state.error}</center>
            {this.state.products.length !== 0 ? (
              this.state.products.map((product, index) => {
                return (
                  <Card
                    pro={this.state.products}
                    product={product}
                    index={index}
                    handleAdd={this.handleAdd}
                    compare={this.state.compare}
                    handleRemove={this.handleRemove}
                    handleFavDelete={this.handleFavDelete}
                  />
                );
              })
            ) : (
              <h3>WishList is Empty!</h3>
            )}
          </div>
          {this.state.compare.length === 2 ? (
            <div>
              <CompareModal
                data={this.state.compare}
                product={this.state.products}
                handle={this.handleCompare}
              />
            </div>
          ) : this.state.compare.length >= 1 ? (
            <h4>Add {2 - this.state.compare.length} Items To Start Compare</h4>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
export default Cart;
