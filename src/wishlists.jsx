import React, { Component } from "react";
import firebase from "./firebase";
class Cart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      total: 0
    };
  }
  async componentDidMount() {
    let fav = "";
    let table = "";
    let favs = "";
    await firebase.auth().onAuthStateChanged(authenticated => {
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
        if (fav.fav) {
          favs = [...fav.fav];
        }
        console.log(favs);
      }
    });
    if (favs !== "") {
      const itemsRef = firebase.database().ref("products");
      console.log(itemsRef);
      let products = "";
      itemsRef.on("value", snapshot => {
        products = snapshot.val();
      });
      console.log(products);
      let newState = [];
      for (let i = 0; i < favs.length; i++) {
        for (let product in products) {
          let item = JSON.stringify(favs[i]);
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
    } else {
      this.setState({ error: "WishList is empty" });
    }
  }
  render() {
    console.log(this.state.total);
    return (
      <div>
        <div className="container">
          <center>{this.state.error}</center>
          {this.state.products.map((product, index) => {
            return (
              <div className="card" key={index}>
                <img className="img" src={product.url} alt="poster" />

                <div className="name">{product.Products}</div>
                <div className="category">{product.Category}</div>
                <div className="price">&#8377;{product.Price}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Cart;
