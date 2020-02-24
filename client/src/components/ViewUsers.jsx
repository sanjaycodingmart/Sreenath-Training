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
import { imgUrl } from "../config.json";

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  render() {
    console.log(this.state.products);
    return (
      <div className="tableUser">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell align="right">AddedOn</TableCell>
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
