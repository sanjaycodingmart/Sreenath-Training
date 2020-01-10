import React, { Component } from "react";
import Navigation from "./Navigation";
import "./App.css";
import firebase from "./firebase";
class App extends Component {
  state = {
    authenticated: false,
    isAdmin: false,
    isLoading: true
  };
  demoAsyncCall = () => {
    return new Promise(resolve => setTimeout(() => resolve(), 2500));
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(authenticated => {
      if (authenticated) {
        let logger = authenticated.email;
        const itemsRef = firebase.database().ref("users");
        itemsRef.on("value", snapshot => {
          let users = snapshot.val();
          for (let user in users) {
            if (logger === users[user].email) {
              this.setState({ isAdmin: users[user].isAdmin });
            }
          }
        });

        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    });
    this.demoAsyncCall().then(() => this.setState({ isLoading: false }));
  }

  render() {
    console.log(this.state.isLoading);
    if (this.state.isLoading) {
      console.log(this.state.isLoading);
      return null;
    } else {
      return (
        <Navigation
          authenticated={this.state.authenticated}
          isAdmin={this.state.isAdmin}
        />
      );
    }
  }
}
export default App;
