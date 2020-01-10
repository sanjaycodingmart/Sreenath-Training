import React, { Component } from "react";
import firebase from "./firebase";
import Slideshow from "./slider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Img from "react-image";
import spinner from "./images/Spinner.gif";

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const itemsRef = firebase.database().ref("products");
    // itemsRef.once("value").then(async snapshot => {
    //   const products = await snapshot.val();
    //   console.log(new Date().valueOf());
    //   this.setState({ products });
    // });

    itemsRef.on("value", snapshot => {
      let products = snapshot.val();
      console.log(products);

      let newState = [];
      for (let product in products) {
        newState.push({
          id: product,
          Products: products[product].Products,
          Price: products[product].Price,
          Category: products[product].Category,
          Quantity: products[product].Quantity,
          url: products[product].url,
          fav: products[product].fav
        });
      }
      this.setState({
        products: newState
      });
    });
  }

  handleBuy = event => {
    const product = event.target.id;
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
          carts = [...cart.cart, product];
        } else {
          carts = [product];
        }
        ref.update({ cart: carts });
        // cart = { ...carts, product };
      }
      console.log(authenticated.email);
    });
    toast.success("Item Added to cart !", {
      position: toast.POSITION.TOP_CENTER
    });
    this.minusQuant(product);
  };
  minusQuant = product => {
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
    quantity = quant.Quantity - 1;
    db.update({ Quantity: quantity });
  };
  handleOut = () => {
    toast.error("Item Out of Stock", {
      position: toast.POSITION.TOP_CENTER
    });
  };
  handleFav = event => {
    let favorite = event.target.id;
    console.log(favorite);
    let bool = event.target.value;
    console.log(bool);
    if (bool === "false") {
      console.log("INN");
      let fav = "";
      let table = "";
      let favs = "";
      let prod = "";
      firebase.auth().onAuthStateChanged(authenticated => {
        const logger = authenticated.email;
        if (authenticated) {
          const db = firebase.database().ref("users");
          db.on("value", snapshot => {
            let users = snapshot.val();
            for (let user in users) {
              if (logger === users[user].email) {
                table = user;
                fav = users[user];
              }
            }
          });
          const ref = firebase
            .database()
            .ref("users")
            .child(table);

          ref.on("value", snapshot => {
            fav = snapshot.val();
          });
          console.log(fav);
          if (fav.fav) {
            favs = [...fav.fav, favorite];
          } else {
            favs = [favorite];
          }
          ref.update({ fav: favs });
          // cart = { ...favs, product };
          const pro = firebase
            .database()
            .ref("products")
            .child(favorite);
          pro.on("value", snapshot => {
            prod = snapshot.val();
          });
          console.log(prod);
          pro.update({ fav: true });
        }
      });
      toast.info("Item Wishlisted !", {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      this.deleteFav(favorite);
      let prod = "";
      console.log("fasle inn");
      const pro = firebase
        .database()
        .ref("products")
        .child(favorite);
      pro.on("value", snapshot => {
        prod = snapshot.val();
      });
      console.log(prod);
      pro.update({ fav: false });
    }
  };
  deleteFav = product => {
    let fav = "";
    let table = "";
    let favs = "";
    firebase.auth().onAuthStateChanged(authenticated => {
      const logger = authenticated.email;
      if (authenticated) {
        const db = firebase.database().ref("users");
        db.on("value", snapshot => {
          let users = snapshot.val();
          for (let user in users) {
            if (logger === users[user].email) {
              table = user;
              fav = users[user];
            }
          }
        });
        const ref = firebase
          .database()
          .ref("users")
          .child(table);

        ref.on("value", snapshot => {
          fav = snapshot.val();
        });
        console.log(fav);
        if (fav.fav) {
          favs = [...fav.fav];
          favs.splice(product, 1);
        } else {
          favs = [product];
        }
        ref.update({ fav: favs });
        // cart = { ...carts, product };
      }
      console.log(authenticated.email);
    });
    toast.warn("Item Removed from Wishlist !", {
      position: toast.POSITION.TOP_CENTER
    });
  };
  render() {
    // console.log(this.state.products);
    return (
      <div>
        <div className="slide">
          <Slideshow />
        </div>
        <ToastContainer autoClose={2000} />
        <hr></hr>
        <div className="container">
          {/* {products
            ? Object.keys(products).map(id => {
                const product = products[id];
                return (
                  <div className="card" key={id}>
                    <div className="fav">
                      <button
                        id={id}
                        value={product.fav}
                        style={
                          product.fav ? { color: "red" } : { color: "black" }
                        }
                        onClick={this.handleFav}
                      >
                        &hearts;
                      </button>
                    </div>
                    <img className="img" src={product.url} alt="poster" />
                    {product.Quantity > 0 ? (
                      <div className="button">
                        <a id={id} onClick={this.handleBuy}>
                          ADD TO CART
                        </a>
                      </div>
                    ) : (
                      <div className="button-out">
                        <a id={id} onClick={this.handleOut}>
                          Out Of Stock
                        </a>
                      </div>
                    )}
                    <div className="name">{product.Products}</div>
                    <div className="category">{product.Category}</div>
                    <div className="price">&#8377;{product.Price}</div>
                  </div>
                );
              })
            : "Loading..."} */}
          {this.state.products ? (
            this.state.products.map(product => {
              return (
                <div className="card" key={product.id}>
                  <div className="fav">
                    <button
                      id={product.id}
                      value={product.fav}
                      style={
                        product.fav ? { color: "red" } : { color: "black" }
                      }
                      onClick={this.handleFav}
                    >
                      &hearts;
                    </button>
                  </div>
                  <Img
                    className="img"
                    src={product.url}
                    loader={<img src={spinner} width="120px" height="200px" />}
                    unloader="can't Load"
                  />
                  {/* <img className="img" src={product.url} alt="poster" /> */}

                  {product.Quantity > 0 ? (
                    <div className="button">
                      <a id={product.id} onClick={this.handleBuy}>
                        ADD TO CART
                      </a>
                    </div>
                  ) : (
                    <div className="button-out">
                      <a id={product.id} onClick={this.handleOut}>
                        Out Of Stock
                      </a>
                    </div>
                  )}
                  <div className="name">{product.Products}</div>
                  <div className="category">{product.Category}</div>
                  <div className="price">&#8377;{product.Price}</div>
                </div>
              );
            })
          ) : (
            <center>
              {" "}
              <img className="load" src={spinner} />
            </center>
          )}
        </div>
      </div>
    );
  }
}
export default Home;
