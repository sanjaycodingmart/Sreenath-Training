import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import HistoryCard from "./common/historyCard";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { apiUrl } from "../config.json";

class OrderHistory extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      transId: []
    };
  }
  async componentDidMount() {
    const decoded = jwt_decode(localStorage.getItem("token"));
    const userId = decoded.email;

    await axios
      .post(apiUrl + `/order/items`, {
        userId
      })
      .then(res => {
        let transId = [];
        for (let i = 0; i < res.data.length; i++) {
          transId.push(res.data[i].transId);
        }
        transId = [...new Set(transId)];
        this.setState({ transId });
        let products = res.data;
        let newState = [];
        for (let product in products) {
          newState.push({
            orderId: products[product].id,
            transId: products[product].transId,
            tracking: products[product].tracking,
            boughtDate: products[product].createdAt,
            id: products[product].Product.id,
            Products: products[product].Product.product,
            estDD: products[product].estDD,
            Price: products[product].Product.price,
            Category: products[product].Product.category,
            canReturn: products[product].Product.canReturn,
            Quantity: products[product].Product.quantity,
            url: products[product].Product.url,
            fav: products[product].Product.fav,
            payment: {
              transId: products[product].Payment.transId,
              amount: products[product].Payment.transAmount,
              receipt: products[product].Payment.receipt
            }
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

  render() {
    return (
      <div>
        <div className="main">
          <div className="container-history">
            <ToastContainer autoClose={2000} />
            <center>{this.state.error1}</center>
            {this.state.transId.length !== 0 ? (
              this.state.transId.map((transaction, index) => {
                return (
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id={transaction}
                    >
                      <Typography>Order #{index}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="history-container">
                      {this.state.products.map(products => {
                        if (transaction === products.transId) {
                          return <HistoryCard product={products} />;
                        }
                      })}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                );
              })
            ) : (
              <h3>Your Order History is empty!</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default OrderHistory;
