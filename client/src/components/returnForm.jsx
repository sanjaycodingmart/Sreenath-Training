import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import jwt_decode from "jwt-decode";
import { apiUrl } from "../config.json";
import { imgUrl } from "../config.json";

class ReturnForm extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      Products: "",
      Price: "",
      Category: "",
      Quantity: "",
      url: [],
      fav: "",
      reasonReturn: "",
      status: "pending"
    };
  }
  componentDidMount() {
    const Id = this.props.match.params.id;

    axios
      .post(apiUrl + `/order/items/:id`, {
        Id
      })
      .then(res => {
        let products = res.data;
        this.setState({
          user: products[0].userId,
          id: products[0].id,
          product: products[0].productId,
          transId: products[0].transId,
          seller: products[0].Product.seller,
          Products: products[0].Product.product,
          Price: products[0].Product.price,
          Category: products[0].Product.category,
          Quantity: products[0].Product.quantity,
          url: products[0].Product.url,
          fav: products[0].Product.fav,
          viewImage: imgUrl + products[0].Product.url[0]
        });
      });
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleRequest = event => {
    axios
      .post(apiUrl + `/returns`, {
        userId: this.state.user,
        productId: this.state.product,
        transId: this.state.transId,
        seller: this.state.seller,
        reason: this.state.reasonReturn,
        status: this.state.status
      })
      .then(res => {
        this.props.history.push("/returnsuccess");
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };
  handleOut = () => {
    toast.error("Item Out of Stock", {
      position: toast.POSITION.TOP_CENTER
    });
  };
  handleImageChange = e => {
    this.setState({ viewImage: e.target.src });
  };
  render() {
    return (
      <div className="Product">
        <ToastContainer autoClose={2000} />
        <div className="thumb-space">
          {this.state.url.map(urls => {
            return (
              <img
                className="thumbnail"
                src={imgUrl + urls}
                width="50px"
                height="50px"
                onMouseOver={this.handleImageChange}
              ></img>
            );
          })}
        </div>
        <img className="viewer" src={this.state.viewImage} alt="" />
        <div className="title">{this.state.Products}</div>
        <div className="Price">
          &#8377;{this.state.Price}
          <TextField
            id="reasonReturn"
            select
            label="Reason for Return"
            name="reasonReturn"
            value={this.state.canReturn}
            onChange={this.handleChange}
            helperText="Please select your Return Reason"
            variant="outlined"
          >
            <MenuItem key="ItemDefective" value="Item Defective">
              Item Defective
            </MenuItem>
            <MenuItem key="NotasExpected" value="Not as Expected">
              Not as Expected
            </MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            className="bu"
            name="add"
            onClick={this.handleRequest}
          >
            Return
          </Button>
        </div>
      </div>
    );
  }
}

export default ReturnForm;
