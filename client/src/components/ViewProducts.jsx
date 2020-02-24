import React, { Component } from "react";
import axios from "axios";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import EditModal from "./editModal";
import { apiUrl } from "../config.json";
import { imgUrl } from "../config.json";

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
      products: []
    };
  }
  async componentDidMount() {
    window.addEventListener("scroll", this.listenToScroll);
    await axios
      .post(apiUrl + `/product/gets`, {
        offsets: this.state.offset
      })
      .then(res => {
        let products = res.data;
        let newState = this.state.products;
        for (let product in products) {
          newState.push({
            id: products[product].id,
            Products: products[product].product,
            brand: products[product].brand,
            Price: products[product].price,
            memPrice: products[product].memPrice,
            canReturn: products[product].canReturn,
            Category: products[product].category,
            Quantity: products[product].quantity,
            url: products[product].url,
            Seller: products[product].seller
          });
        }
        this.setState({
          products: newState
        });
      });
  }
  listenToScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
      this.setState({
        offset: this.state.offset + 10
      });
      this.componentDidMount();
    }
  };
  handleDelete = async e => {
    let id = e.target.value;
    axios.post(apiUrl + `/product/delete`, { id }).then(res => {
      toast.success("Product Deleted Successfully", {
        position: toast.POSITION.TOP_CENTER
      });
      this.componentDidMount();
    });
  };
  handleProps = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <div>
        <ToastContainer autoClose={2000} />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Available Quantity</TableCell>
                <TableCell align="right">Seller Company</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.products.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Link to={`product/${row.id}`}>{row.Products}</Link>
                  </TableCell>
                  <TableCell align="right">{row.Price}</TableCell>
                  <TableCell align="right">{row.Category}</TableCell>
                  <TableCell align="right">{row.Quantity}</TableCell>
                  <TableCell align="right">{row.Seller}</TableCell>
                  <TableCell align="right">
                    <img src={imgUrl + row.url[0]} width="40px" height="60px" />
                  </TableCell>
                  <TableCell align="right">
                    <EditModal product={row} mount={this.handleProps} />
                    <button
                      value={row.id}
                      className="edit-but"
                      onClick={this.handleDelete}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default Chart;
