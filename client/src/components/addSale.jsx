import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { apiUrl } from "../config.json";

class AddSale extends Component {
  constructor() {
    super();
    this.state = {
      brand: "",
      brandOffer: "",
      date: new Date()
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleDateChange = async (event, date, id) => {
    this.setState({ date: date });
  };
  handleTimeChange = event => {
    this.setState({ date: event });
  };
  handleSubmit = () => {
    axios.post(apiUrl + `/advertisement/sale`, {
      brand: this.state.brand,
      offer: this.state.brandOffer,
      DOS: this.state.date
    });
  };
  render() {
    return (
      <div className="login-container">
        <div className="title">Add a Sale</div>

        <div className="forms-1">
          <form className="forms">
            <TextField
              className="input"
              type="text"
              name="brand"
              id="seller"
              label="Sale Brand Name"
              variant="outlined"
              value={this.state.brand}
              onChange={this.handleChange}
            />
            <TextField
              className="input"
              type="text"
              name="brandOffer"
              id="offerseller"
              label="Sale Offer Amount"
              variant="outlined"
              value={this.state.brandOffer}
              onChange={this.handleChange}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  id="date"
                  format="MM/dd/yyyy"
                  name="date"
                  disablePast="true"
                  value={this.state.date}
                  onChange={(date, dateString) =>
                    this.handleDateChange(date, dateString)
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  value={this.state.date}
                  onChange={this.handleTimeChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time"
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Button
              variant="contained"
              color="primary"
              className="but"
              name="add"
              onClick={this.handleSubmit}
            >
              Add
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddSale;
