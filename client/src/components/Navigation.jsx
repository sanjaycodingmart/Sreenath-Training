import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import Popover, { ArrowContainer } from "react-tiny-popover";
import { apiUrl } from "../config.json";
class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      notify: 0,
      returnnotify: 0,
      isPopoverOpen: false,
      isPopoverOpen1: false,
      products: [],
      requests: [],
      supports: []
    };
  }
  componentDidMount() {
    if (this.props.isAdmin) {
      setInterval(() => {
        axios
          .get(apiUrl + `/notifyItem/request`)
          .then(res => {
            if (res.data.length > 0) {
              this.setState({ notify: res.data.length });
            } else {
              this.setState({ notify: 0 });
            }
            let requests = res.data;

            let newState = [];
            for (let request in requests) {
              newState.push({
                id: requests[request].id,
                companyName: requests[request].companyName,
                sellerName: requests[request].sellerName,
                address: requests[request].address,
                email: requests[request].email,
                contact: requests[request].contact
              });
            }
            this.setState({
              requests: newState
            });
          })
          .catch(err => console.log(err));

        axios
          .get(apiUrl + `/notifyItem/support`)
          .then(res => {
            if (res.data.length > 0) {
              this.setState({ notify: res.data.length });
            } else {
              this.setState({ notify: 0 });
            }
            let requests = res.data;

            let newState = [];
            for (let request in requests) {
              newState.push({
                id: requests[request].id,
                user: requests[request].user,
                message: requests[request].message,
                seen: requests[request].seen
              });
            }
            this.setState({
              supports: newState
            });
          })
          .catch(err => console.log(err));
      }, 2000);
    } else if (this.props.isSellerCompany) {
      setInterval(() => {
        axios
          .get(apiUrl + `/notifyItem`)
          .then(res => {
            if (res.data.length > 0) {
              this.setState({ notify: res.data.length });
            } else {
              this.setState({ notify: 0 });
            }
            let products = res.data;

            let newState = [];
            for (let product in products) {
              newState.push({
                user: products[product].userId,
                id: products[product].id,
                Products: products[product].Product.product,
                Price: products[product].Product.price,
                Category: products[product].Product.category,
                Quantity: products[product].Product.quantity,
                url: products[product].Product.url,
                fav: products[product].Product.fav
              });
            }
            this.setState({
              products: newState
            });
          })
          .catch(err => console.log(err));
      }, 2000);
      setInterval(() => {
        axios
          .get(apiUrl + `/notifyItem/return`)
          .then(res => {
            if (res.data.length > 0) {
              this.setState({ returnnotify: res.data.length });
            } else {
              this.setState({ returnnotify: 0 });
            }
            let returnss = res.data;

            let newState = [];
            for (let returns in returnss) {
              newState.push({
                user: returnss[returns].userId,
                id: returnss[returns].id,
                product: returnss[returns].productId,
                transId: returnss[returns].transId
              });
            }
            this.setState({
              returns: newState
            });
          })
          .catch(err => console.log(err));
      }, 2000);
    }
  }
  handlePop = () => {
    let pop = this.state.isPopoverOpen;
    this.setState({ isPopoverOpen: !pop });
  };
  handlePop1 = () => {
    let pop = this.state.isPopoverOpen1;
    this.setState({ isPopoverOpen1: !pop });
  };

  render() {
    return (
      <div>
        <div className="navBar">
          <div className="left-buttons">
            {!this.props.plusMember ? (
              <Link className="links" to="/becomeplus">
                <a className="become-links">
                  Explore <span className="_2Ky4Ru">Plus</span>
                  <img
                    width="10"
                    src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/plus_b13a8b.png"
                  />
                </a>
              </Link>
            ) : (
              <a className="become-links">
                You are <span className="_2Ky4Ru">Plus</span>
                <img
                  width="10"
                  src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/plus_b13a8b.png"
                />
              </a>
            )}
          </div>
          <div className="buttons">
            <NavLink className="links tm" to="/">
              Home
            </NavLink>
            {this.props.authenticated &&
            !this.props.isAdmin &&
            !this.props.isSellerAdmin &&
            !this.props.isSellerCompany ? (
              <span>
                <Link className="links" to="/cart">
                  Cart
                </Link>
                <NavLink className="links" to="/wishlists">
                  WishLists
                </NavLink>
                <NavLink className="links" to="/orderhistory">
                  My Order
                </NavLink>
                <NavLink className="links" to="/returnorders">
                  Returns
                </NavLink>
                <NavLink className="links" to="/logout">
                  Logout
                </NavLink>
              </span>
            ) : this.props.authenticated && this.props.isAdmin ? (
              <span>
                <NavLink className="links" to="/adminchat">
                  Support Chat
                </NavLink>
                <NavLink className="links" to="/addsale">
                  Add Sale
                </NavLink>
                <NavLink className="links" to="/advplatform">
                  Add Advertise
                </NavLink>
                <NavLink className="links" to="/viewproducts">
                  View Products
                </NavLink>
                <NavLink className="links" to="/viewusers">
                  View Users
                </NavLink>
                <NavLink className="links" to="/chart">
                  View Chart
                </NavLink>
                <Popover
                  isOpen={this.state.isPopoverOpen}
                  position={["bottom"]}
                  padding={1}
                  containerClassName="popover"
                  onClickOutside={() => this.setState({ isPopoverOpen: false })}
                  content={({ position, targetRect, popoverRect }) => (
                    <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                      position={position}
                      targetRect={targetRect}
                      popoverRect={popoverRect}
                      arrowColor={"blue"}
                      arrowSize={10}
                      arrowStyle={{ opacity: 0.7 }}
                    >
                      <div style={{ backgroundColor: "blue", opacity: 1 }}>
                        {this.state.notify !== 0 ? (
                          this.state.requests.map((request, index) => {
                            return (
                              <Link
                                className="Link"
                                to={`/returnrequest/${request.id}`}
                              >
                                <div className="notcard-req" key={index}>
                                  <div>
                                    Company:{request.companyName} sellerName:
                                    {request.sellerName} Contact:
                                    {request.contact}
                                  </div>
                                </div>
                              </Link>
                            );
                          })
                        ) : (
                          <h3 className="notcard">No new Notifications</h3>
                        )}
                        {this.state.suppports !== 0 ? (
                          this.state.supports.map((request, index) => {
                            return (
                              <Link
                                className="Link"
                                to={`/adminchat/${request.user}`}
                              >
                                <div className="notcard-sup" key={index}>
                                  <div>
                                    Support Notification User:{request.user}{" "}
                                    Message:
                                    {request.message}
                                  </div>
                                </div>
                              </Link>
                            );
                          })
                        ) : (
                          <h3 className="notcard">No new Notifications</h3>
                        )}
                      </div>
                    </ArrowContainer>
                  )}
                >
                  <Badge
                    className="links"
                    invisible={!this.state.notify}
                    badgeContent={this.state.notify}
                    onClick={this.handlePop}
                    color="secondary"
                  >
                    <MailIcon />
                  </Badge>
                </Popover>
                <NavLink className="links" to="/logout">
                  Logout
                </NavLink>
              </span>
            ) : this.props.authenticated &&
              this.props.isSellerCompany &&
              !this.state.isSellerAdmin ? (
              <span>
                <NavLink className="links" to="/setbid">
                  Set Offer
                </NavLink>
                <NavLink className="links" to="/viewproducts">
                  View Products
                </NavLink>
                <NavLink className="links" to="/chart">
                  View Chart
                </NavLink>
                <Popover
                  isOpen={this.state.isPopoverOpen}
                  position={["bottom"]}
                  padding={1}
                  containerClassName="popover"
                  onClickOutside={() => this.setState({ isPopoverOpen: false })}
                  content={({ position, targetRect, popoverRect }) => (
                    <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                      position={position}
                      targetRect={targetRect}
                      popoverRect={popoverRect}
                      arrowColor={"blue"}
                      arrowSize={10}
                      arrowStyle={{ opacity: 0.7 }}
                    >
                      <div style={{ backgroundColor: "blue", opacity: 1 }}>
                        {this.state.notify !== 0 ? (
                          this.state.products.map((product, index) => {
                            return (
                              <Link
                                className="Link"
                                to={`/order/${product.id}`}
                              >
                                <div className="notcard" key={index}>
                                  <div>
                                    User:{product.user} Bought:
                                    {product.Products} At Price of:
                                    {product.Price}
                                  </div>
                                </div>
                              </Link>
                            );
                          })
                        ) : (
                          <h3 className="notcard">No new Notifications</h3>
                        )}
                      </div>
                    </ArrowContainer>
                  )}
                >
                  <Badge
                    className="links"
                    invisible={!this.state.notify}
                    badgeContent={this.state.notify}
                    onClick={this.handlePop}
                    color="secondary"
                  >
                    <MailIcon />
                  </Badge>
                </Popover>
                <Popover
                  isOpen={this.state.isPopoverOpen1}
                  position={["bottom"]}
                  padding={1}
                  containerClassName="popover"
                  onClickOutside={() =>
                    this.setState({ isPopoverOpen1: false })
                  }
                  content={({ position, targetRect, popoverRect }) => (
                    <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                      position={position}
                      targetRect={targetRect}
                      popoverRect={popoverRect}
                      arrowColor={"red"}
                      arrowSize={10}
                      arrowStyle={{ opacity: 0.7 }}
                    >
                      <div style={{ backgroundColor: "red", opacity: 1 }}>
                        {this.state.returnnotify !== 0 ? (
                          this.state.returns.map((returns, index) => {
                            return (
                              <Link
                                className="Link"
                                to={`/returnrequest/${returns.id}`}
                              >
                                <div className="notcard" key={index}>
                                  <div>
                                    User:{returns.user} Return Request:
                                    {returns.product}
                                  </div>
                                </div>
                              </Link>
                            );
                          })
                        ) : (
                          <h3 className="notcard">No new Notifications</h3>
                        )}
                      </div>
                    </ArrowContainer>
                  )}
                >
                  <Badge
                    className="links"
                    invisible={!this.state.returnnotify}
                    badgeContent={this.state.returnnotify}
                    onClick={this.handlePop1}
                    color="secondary"
                  >
                    <MailIcon />
                  </Badge>
                </Popover>
                <NavLink className="links" to="/logout">
                  Logout
                </NavLink>
              </span>
            ) : this.props.authenticated && this.props.isSellerAdmin ? (
              <span>
                <NavLink className="links" to="/viewproducts">
                  View Products
                </NavLink>
                <NavLink className="links" to="/dashboard">
                  Add Products
                </NavLink>
                <NavLink className="links" to="/settrack">
                  Set Order Status
                </NavLink>
                <NavLink className="links" to="/logout">
                  Logout
                </NavLink>
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
      </div>
    );
  }
}
export default Navigation;
