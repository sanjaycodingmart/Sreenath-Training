import React, { Component } from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { apiUrl } from "../config.json";
class setTrack extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      tracks: ["Order Received", "Packed", "Shipped", "Delivered"],
      selectedDate: new Date(),
      offset: 10,
      orderBy: "createdAt",
      orderDirection: "desc"
    };
  }
  async componentDidMount() {
    window.addEventListener("scroll", this.listenToScroll);
    await axios
      .post(apiUrl + `/order/change`, {
        offsets: this.state.offset,
        orderBy: this.state.orderBy,
        orderDirection: this.state.orderDirection
      })
      .then(res => {
        let products = res.data;
        let newState = [];
        for (let product in products) {
          newState.push({
            Oid: products[product].id,
            Products: products[product].Product.product,
            Price: products[product].Product.price,
            tracking: products[product].tracking,
            transId: products[product].transId,
            estDD: products[product].estDD
          });
        }
        this.setState({
          products: newState,
          offset: this.state.offset
        });
      })
      .catch(error => {
        this.setState({ error: error });
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
  handleChange = async event => {
    await axios
      .post(apiUrl + `/order/update`, {
        tracking: event.target.value,
        Ids: event.target.name
      })
      .then(res => {
        this.componentDidMount();
      });
  };
  handleDateChange = async (event, date, id) => {
    await axios
      .post(apiUrl + `/order/updatedate`, {
        estDD: date,
        Ids: id
      })
      .then(res => {
        this.componentDidMount();
      });
  };
  handleRequestSort = (id, direction) => {
    if (id === this.state.orderBy) {
      direction === "asc"
        ? this.setState({ orderDirection: "desc" })
        : this.setState({ orderDirection: "asc" });
      this.componentDidMount();
    } else {
      this.setState({ orderBy: id, orderDirection: "asc" });
      this.componentDidMount();
    }
  };
  render() {
    const headCells = [
      { id: "id", sortLable: true, label: "Order Id" },
      {
        id: "productId",
        sortLable: true,
        label: "Product Name"
      },
      { id: "price", sortLable: false, align: "right", label: "Price" },
      {
        id: "transId",
        sortLable: true,
        align: "right",
        label: "Transaction Id"
      },
      {
        id: "tracking",
        align: "center",
        sortLable: true,
        label: "Tracking"
      },
      {
        id: "trackingStatus",
        align: "center",
        sortLable: false,
        label: "Change Status"
      },
      {
        id: "estDD",
        align: "center",
        sortLable: false,
        label: "Est. Delivery Date"
      },
      {
        id: "estDDChange",
        align: "center",
        sortLable: false,
        label: "Set Delivery Date"
      }
    ];
    return (
      <div>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {headCells.map(headCell => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.align}
                    // sortDirection={orderBy === headCell.id ? order : false}
                  >
                    {headCell.sortLable ? "" : headCell.label}
                    {headCell.sortLable ? (
                      <TableSortLabel
                        active={this.state.orderBy === headCell.id}
                        direction={this.state.orderDirection}
                        onClick={() =>
                          this.handleRequestSort(
                            headCell.id,
                            this.state.orderDirection
                          )
                        }
                      >
                        {headCell.label}
                      </TableSortLabel>
                    ) : (
                      " "
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.products.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.Oid}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.Products}
                  </TableCell>
                  <TableCell align="right">&#8377;{row.Price}</TableCell>
                  <TableCell align="right">{row.transId}</TableCell>
                  <TableCell align="center">{row.tracking}</TableCell>
                  <TableCell align="center">
                    <TextField
                      id={index}
                      select
                      name={row.Oid}
                      value={row.tracking}
                      onChange={this.handleChange}
                    >
                      {this.state.tracks.map(option => (
                        <MenuItem key={option} name={row.Oid} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell align="center">{row.estDD}</TableCell>
                  <TableCell align="center">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardDatePicker
                          margin="normal"
                          id={row.Oid}
                          format="MM/dd/yyyy"
                          name={row.Oid}
                          disablePast="true"
                          value={
                            row.estDD === "Deliver in 3 to 5 days"
                              ? new Date()
                              : row.estDD
                          }
                          onChange={(date, dateString) =>
                            this.handleDateChange(date, dateString, row.Oid)
                          }
                          KeyboardButtonProps={{
                            "aria-label": "change date"
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
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

export default setTrack;
