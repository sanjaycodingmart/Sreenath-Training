import React, { Component } from "react";
import firebase from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class Cart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      total: 0
    };
  }
  async componentDidMount() {
    let cart = "";
    let table = "";
    let carts = "";
    await firebase.auth().onAuthStateChanged(authenticated => {
      const logger = authenticated.email;
      if (authenticated) {
        const db = firebase.database().ref("users");
        db.on("value", snapshot => {
          let users = snapshot.val();
          for (let user in users) {
            if (logger === users[user].email) {
              table = user;
              cart = users[user];
            }
          }
        });
        const ref = firebase
          .database()
          .ref("users")
          .child(table);

        ref.on("value", snapshot => {
          cart = snapshot.val();
        });
        if (cart.cart) {
          carts = [...cart.cart];
        }
        console.log(carts);
      }
    });
    if (carts !== "") {
      const itemsRef = firebase.database().ref("products");
      console.log(itemsRef);
      let products = "";
      itemsRef.on("value", snapshot => {
        products = snapshot.val();
      });
      console.log(products);
      let newState = [];
      for (let i = 0; i < carts.length; i++) {
        for (let product in products) {
          let item = JSON.stringify(carts[i]);
          let pro = JSON.stringify(product);
          let quant = JSON.parse(products[product].Quantity);
          console.log(quant);
          if (item === pro && quant >= 0) {
            newState.push({
              id: product,
              Products: products[product].Products,
              Price: products[product].Price,
              Category: products[product].Category,
              Quantity: products[product].Quantity,
              url: products[product].url
            });
          }
        }
        console.log(newState);
        this.setState({
          products: newState
        });
      }
      this.addTotal();
    } else {
      this.setState({ error: "Cart is empty" });
    }
  }

  addTotal = () => {
    let proLen = this.state.products.length;
    let product = this.state.products;
    console.log(product);
    let total = 0;
    for (let i = 0; i < proLen; i++) {
      let price = JSON.parse(product[i].Price);
      total = total + price;
    }
    this.setState({ total });
    console.log(total);
    console.log(this.state.total);
  };
  handleRemove = event => {
    let index = event.target.id;
    console.log(index);
    let product = event.target.name;
    console.log(product);
    let prod = this.state.products;

    console.log(event);
    this.addQuant(product);
    this.deleteCart(product);
    prod.splice(index, 1);
    this.setState({
      products: prod
    });
    this.addTotal();
  };
  addQuant = product => {
    let quant = "";
    let quantity;
    const db = firebase
      .database()
      .ref("products")
      .child(product);
    db.on("value", snapshot => {
      quant = snapshot.val();
    });
    console.log(quant);
    quantity = quant.Quantity + 1;
    db.update({ Quantity: quantity });
  };
  deleteCart = product => {
    let cart = "";
    let table = "";
    let carts = "";
    firebase.auth().onAuthStateChanged(authenticated => {
      const logger = authenticated.email;
      if (authenticated) {
        const db = firebase.database().ref("users");
        db.on("value", snapshot => {
          let users = snapshot.val();
          for (let user in users) {
            if (logger === users[user].email) {
              table = user;
              cart = users[user];
            }
          }
        });
        const ref = firebase
          .database()
          .ref("users")
          .child(table);

        ref.on("value", snapshot => {
          cart = snapshot.val();
        });
        console.log(cart);
        if (cart.cart) {
          carts = [...cart.cart];
          carts.splice(product, 1);
        } else {
          carts = [product];
        }
        ref.update({ cart: carts });
        // cart = { ...carts, product };
      }
      console.log(authenticated.email);
    });
    toast.warn("Item Removed !", {
      position: toast.POSITION.TOP_CENTER
    });
  };
  handleFinish = () => {};
  render() {
    console.log(this.state.total);
    return (
      <div>
        <div className="container">
          <ToastContainer autoClose={2000} />
          <center>{this.state.error}</center>
          {this.state.products.map((product, index) => {
            return (
              <div className="card" key={index}>
                <img className="img" src={product.url} alt="poster" />
                <div class="button">
                  <a id={index} name={product.id} onClick={this.handleRemove}>
                    Remove
                  </a>
                </div>
                <div className="name">{product.Products}</div>
                <div className="category">{product.Category}</div>
                <div className="price">&#8377;{product.Price}</div>
              </div>
            );
          })}{" "}
        </div>
        <div className="total-nav">
          <div className="total">
            &#8377;{this.state.total}
            <button className="cart-but" onClick={this.handleFinish}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Cart;
