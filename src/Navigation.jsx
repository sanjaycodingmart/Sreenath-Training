import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./register";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "./cart";
import LogOut from "./Logout";
import WishLists from "./wishlists";
class Navigation extends Component {
  render() {
    console.log(this.props.isAdmin);
    return (
      <Router>
        <div>
          <div className="navBar">
            <div className="buttons">
              <NavLink className="links tm" to="/">
                Home
              </NavLink>
              {this.props.authenticated && !this.props.isAdmin ? (
                <span>
                  <NavLink className="links" to="/cart">
                    Cart
                  </NavLink>
                  <NavLink className="links" to="/wishlists">
                    WishLists
                  </NavLink>
                  <LogOut />
                </span>
              ) : this.props.authenticated && this.props.isAdmin ? (
                <span>
                  <NavLink className="links" to="/dashboard">
                    Add Products
                  </NavLink>
                  <LogOut />
                </span>
              ) : (
                <span>
                  <NavLink className="links" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="links" to="/register">
                    SignUp
                  </NavLink>
                </span>
              )}
            </div>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              authenticated={this.props.authenticated}
              path="/login"
              component={Login}
            />
            <Route path="/register" component={Register} />
            <ProtectedRoute
              authenticated={this.props.authenticated}
              path="/dashboard"
              component={Dashboard}
            />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/wishlists" component={WishLists} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default Navigation;
