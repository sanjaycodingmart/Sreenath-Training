import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="foot-content">
          <NavLink className="foot-button" to="/sellerform">
            Become Seller
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Footer;
