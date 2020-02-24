import React, { Component } from "react";
import firebase from "../firebase";
import "firebase/storage";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { apiUrl } from "../config.json";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      Products: "",
      Price: "",
      memPrice: "",
      Category: "",
      Quantity: "",
      url: "",
      canReturn: "",
      images: null,
      imageUrls: [],
      Seller: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFileChange = event => {
    this.setState({
      selectedFile: event.target.files
    });
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState(() => ({ image }));
      const storage = firebase.storage();
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(furl => {
              this.setState({ furl });
            });
        }
      );
    }
  };

  uploadImages = () => {
    const data = new FormData();
    for (var x = 0; x < this.state.selectedFile.length; x++) {
      data.append("file", this.state.selectedFile[x]);
    }

    axios
      .post(apiUrl + `/upload`, data, {})

      .then(res => {
        let urls = [];
        for (let i = 0; i < res.data.length; i++) {
          urls.push(res.data[i].filename);
        }
        this.setState({ imageUrls: urls });
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    let date = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "/");

    const item = {
      Products: this.state.Products,
      Price: this.state.Price,
      Category: this.state.Category,
      Quantity: this.state.Quantity,
      url: this.state.url,
      fav: false,
      addedOn: date
    };

    axios
      .post(apiUrl + `/product`, {
        Product: this.state.Products,
        Price: this.state.Price,
        Brand: this.state.Brand,
        memPrice: this.state.memPrice,
        Category: this.state.Category,
        Quantity: this.state.Quantity,
        furl: this.state.furl,
        url: this.state.imageUrls,
        seller: this.state.Seller,
        canReturn: this.state.canReturn,
        fav: false
      })
      .then(res => {
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error: error });
      });

    this.setState({
      Products: "",
      Price: "",
      Category: "",
      Quantity: "",
      url: ""
    });
  };

  render() {
    return (
      <div className="login-container">
        <div className="title">Add a Product</div>

        <div className="forms-1">
          <form className="forms">
            <TextField
              className="input"
              type="text"
              name="Seller"
              id="seller"
              label="Seller Company Name"
              variant="outlined"
              value={this.state.Seller}
              onChange={this.handleChange}
            />
            <TextField
              className="input"
              type="text"
              name="Products"
              id="movie"
              label="Product Name"
              variant="outlined"
              value={this.state.Products}
              onChange={this.handleChange}
            />
            <TextField
              className="input"
              type="text"
              name="Brand"
              id="movie"
              label="Brand Name"
              variant="outlined"
              value={this.state.Brand}
              onChange={this.handleChange}
            />

            <TextField
              className="input"
              type="text"
              name="Price"
              id="year"
              label="Price"
              variant="outlined"
              value={this.state.Price}
              onChange={this.handleChange}
            />
            <TextField
              className="input"
              type="text"
              name="memPrice"
              id="year"
              label="Members Price"
              variant="outlined"
              value={this.state.memPrice}
              onChange={this.handleChange}
            />

            <TextField
              className="input"
              type="text"
              name="Category"
              id="journal"
              label="Category"
              variant="outlined"
              value={this.state.Category}
              onChange={this.handleChange}
            />
            <TextField
              className="input"
              type="text"
              name="Quantity"
              id="quantity"
              label="Quantity"
              variant="outlined"
              value={this.state.Quantity}
              onChange={this.handleChange}
            />
            <TextField
              id="canReturn"
              select
              label="Can Return"
              name="canReturn"
              value={this.state.canReturn}
              onChange={this.handleChange}
              helperText="Please select your Returnable"
              variant="outlined"
            >
              <MenuItem key="true" value="true">
                Yes
              </MenuItem>
              <MenuItem key="false" value="false">
                No
              </MenuItem>
            </TextField>
            <div className="flex-cont">
              <input
                type="file"
                name="myFiles"
                onChange={this.handleFileChange}
                multiple
              ></input>
              <Button
                variant="contained"
                color="primary"
                className="but"
                name="add"
                onClick={this.uploadImages}
              >
                Upload Images
              </Button>
            </div>
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
export default Dashboard;
