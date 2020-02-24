import React, { Component } from "react";
import "./App.css";
import auth from "./services/authService";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import Home from "./components/Home";
import AdminHome from "./components/AdminHome";
import SellerHome from "./components/SellerHome";
import AddAdvertise from "./components/addAdvertise";
import AddSale from "./components/addSale";
import SetAdBid from "./components/SetAdBid";
import ViewProducts from "./components/ViewProducts";
import ViewUsers from "./components/ViewUsers";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/register";
import Dashboard from "./components/Dashboard";
import SellerForm from "./components/sellerform";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./components/cart";
import Payment from "./components/payment";
import LogOut from "./components/Logout";
import WishLists from "./components/wishlists";
import Chart from "./components/chart";
import Success from "./components/Success";
import ReturnSuccess from "./components/ReturnSuccess";
import ProductForm from "./components/productForm";
import SetTrack from "./components/setTrack";
import BecomePlus from "./components/becomePlus";
import OrderForm from "./components/orderForm";
import ReturnForm from "./components/returnForm";
import OrderHistory from "./components/orderHistory";
import ReturnsOrders from "./components/returnsOrders";
import RequestForm from "./components/requestForm";
import AdminChat from "./components/AdminChat";
import ReturnApproveForm from "./components/returnApproveForm";

class App extends Component {
  state = {
    authenticated: false,
    isAdmin: false,
    isSellerAdmin: false,
    isSellerCompany: false,
    isLoading: true
  };
  demoAsyncCall = () => {
    return new Promise(resolve => setTimeout(() => resolve(), 2000));
  };
  componentDidMount() {
    const user = auth.getCurrentUser();
    if (user) {
      this.setState({
        isAdmin: user.isAdmin,
        isSellerAdmin: user.isSellerAdmin,
        isSellerCompany: user.isSellerCompany,
        authenticated: true,
        plusMember: user.plusMember
      });
    }
    this.demoAsyncCall().then(() => this.setState({ isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      return null;
    } else {
      return (
        <Router>
          <Navigation
            logout={this.stateCall}
            authenticated={this.state.authenticated}
            isAdmin={this.state.isAdmin}
            isSellerCompany={this.state.isSellerCompany}
            isSellerAdmin={this.state.isSellerAdmin}
            plusMember={this.state.plusMember}
          />

          <Switch>
            {this.state.isAdmin ? (
              <Route exact path="/" component={AdminHome} />
            ) : this.state.isSellerAdmin || this.state.isSellerCompany ? (
              <Route exact path="/" component={SellerHome} />
            ) : (
              <Route exact path="/" component={Home} />
            )}
            <Route path="/login" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route path="/register" component={Register} />
            <Route path="/sellerform" component={SellerForm} />
            <Route path="/becomeplus" component={BecomePlus} />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/dashboard"
              component={Dashboard}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/advplatform"
              component={AddAdvertise}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/addsale"
              component={AddSale}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/setbid"
              component={SetAdBid}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/adminchat"
              component={AdminChat}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/viewproducts"
              component={ViewProducts}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/viewusers"
              component={ViewUsers}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/chart"
              component={Chart}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/cart"
              component={Cart}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/orderhistory"
              component={OrderHistory}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/settrack"
              component={SetTrack}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/returnorders"
              component={ReturnsOrders}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/payment"
              component={Payment}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/success"
              component={Success}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/plussuccess"
              component={Success}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/returnsuccess"
              component={ReturnSuccess}
            />
            <Route path="/product/:id" component={ProductForm} />
            <Route path="/order/:id" component={OrderForm} />
            <Route path="/return/:id" component={ReturnForm} />
            <Route path="/returnrequest/:id" component={ReturnApproveForm} />
            <Route path="/request/:id" component={RequestForm} />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/wishlists"
              component={WishLists}
            />
            <ProtectedRoute
              authenticated={this.state.authenticated}
              path="/notification"
              component={Notification}
            />
          </Switch>
        </Router>
      );
    }
  }
}
export default App;
