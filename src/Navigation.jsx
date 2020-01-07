import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
// import Register from "./Register";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import LogOut from "./Logout";
class Navigation extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="navBar">
            <div className="buttons">
              <NavLink className="links tm" to="/">
                Home
              </NavLink>
              {this.props.authenticated ? (
                <span>
                  <NavLink className="links" to="/dashboard">
                    Add
                  </NavLink>
                  <LogOut />
                </span>
              ) : (
                <span>
                  <NavLink className="links" to="/login">
                    Login
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
            {/* <Route path="/register" component={Register} /> */}
            <ProtectedRoute
              authenticated={this.props.authenticated}
              path="/dashboard"
              component={Dashboard}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default Navigation;
