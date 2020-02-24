import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "firebase/storage";
import firebase from "../firebase";
import { apiUrl } from "../config.json";
import { imgUrl } from "../config.json";
class EditForm extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      Products: "",
      brand: "",
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

  componentDidMount() {
    let product = this.props.product.product;

    this.setState({
      id: product.id,
      Products: product.Products,
      Price: product.Price,
      memPrice: product.memPrice,
      Category: product.Category,
      Quantity: product.Quantity,
      url: product.url,
      canReturn: product.canReturn,
      images: null,
      imageUrls: product.url,
      Seller: product.Seller,
      brand: product.brand
    });
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
    if (this.state.selectedFile) {
      for (var x = 0; x < this.state.selectedFile.length; x++) {
        data.append("file", this.state.selectedFile[x]);
      }

      axios
        .post(apiUrl + `/upload`, data, {})

        .then(res => {
          let urls = this.state.imageUrls;
          for (let i = 0; i < res.data.length; i++) {
            urls.push(res.data[i].filename);
          }
          this.setState({ imageUrls: urls });
        });
    } else {
      toast.error("Please select images First", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };
  removeImages = () => {
    this.setState({ imageUrls: [] });
  };
  handleImgDelete = e => {
    e.preventDefault();

    let index = this.state.url.indexOf(e.target.value);
    let imgUrl = this.state.url;
    imgUrl.splice(index, 1);

    this.setState({ url: imgUrl });
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
      .post(apiUrl + `/product/update`, {
        id: this.state.id,
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
        toast.success("Product Updated Successfully", {
          position: toast.POSITION.TOP_CENTER
        });
        this.props.close();
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };
  render() {
    return (
      <div>
        <ToastContainer autoClose={2000} />
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
            value={this.state.brand}
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
            {this.state.url
              ? this.state.url.map(urls => {
                  return (
                    <div className="flex-row">
                      <img
                        className="thumbnail"
                        src={imgUrl + urls}
                        width="50px"
                        height="50px"
                      ></img>
                      <button
                        className="del-but"
                        value={urls}
                        onClick={this.handleImgDelete}
                      >
                        X
                      </button>
                    </div>
                  );
                })
              : ""}
          </div>
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
              Add New Images
            </Button>
          </div>
          <Button
            variant="contained"
            color="primary"
            className="but"
            name="add"
            onClick={this.handleSubmit}
          >
            Update
          </Button>
        </form>
      </div>
    );
  }
}

export default EditForm;
