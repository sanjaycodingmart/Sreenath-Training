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

class AddAdvertise extends Component {
  constructor() {
    super();
    this.state = {
      brand: "",
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
  handleSubmit = () => {
    axios.post(apiUrl + `/advertisement`, {
      brand: this.state.brand,
      DOP: this.state.date
    });
  };
  render() {
    return (
      <div className="login-container">
        <div className="title">Add a Advertisement</div>

        <div className="forms-1">
          <form className="forms">
            <TextField
              className="input"
              type="text"
              name="brand"
              id="seller"
              label="Brand Name"
              variant="outlined"
              value={this.state.brand}
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

export default AddAdvertise;
