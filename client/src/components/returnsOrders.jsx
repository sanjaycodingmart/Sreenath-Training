import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import HistoryCard from "./common/historyCard";
import VStepper from "./stepper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { apiUrl } from "../config.json";

class ReturnsOrders extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      returns: [],
      status: []
    };
  }
  async componentDidMount() {
    const decoded = jwt_decode(localStorage.getItem("token"));
    const userId = decoded.email;

    await axios
      .post(apiUrl + `/returns/all`, {
        userId
      })
      .then(res => {
        let returns = [];
        let status = [];
        for (let i = 0; i < res.data.length; i++) {
          returns.push(res.data[i].Product.product);
          status.push(res.data[i].status);
        }

        this.setState({ returns, status });
        let products = res.data;
        let newState = [];
        for (let product in products) {
          newState.push({
            id: products[product].Product.id,
            Products: products[product].Product.product,
            Price: products[product].Product.price,
            Category: products[product].Product.category,
            canReturn: products[product].Product.canReturn,
            Quantity: products[product].Product.quantity,
            url: products[product].Product.url,
            fav: products[product].Product.fav,
            reason: products[product].reason,
            status: products[product].status
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
            {this.state.returns.length !== 0 ? (
              this.state.returns.map((transaction, index) => {
                return (
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id={transaction}
                    >
                      <Typography>
                        Return Request #{index} {transaction}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {this.state.status[index]}
                      <VStepper data={this.state.status[index]} />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                );
              })
            ) : (
              <h3>Your Return History is empty!</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default ReturnsOrders;
