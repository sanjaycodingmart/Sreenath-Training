import React, { Component } from "react";
import firebase from "./firebase";
import "firebase/storage";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      Products: "",
      Price: "",
      Category: "",
      Quantity: "",
      image: null,
      url: ""
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleFileChange = event => {
    event.preventDefault();
    console.log(event.target.files[0]);
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState(() => ({ image }));
      const storage = firebase.storage();
      // const { image } = this.state;
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          // Error function ...
          console.log(error);
        },
        () => {
          // complete function ...
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              this.setState({ url }, () => console.log(this.state.url));
            });
        }
      );
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    const itemsRef = firebase.database().ref("products");
    const item = {
      Products: this.state.Products,
      Price: this.state.Price,
      Category: this.state.Category,
      Quantity: this.state.Quantity,
      url: this.state.url,
      fav: false
    };
    itemsRef.push(item);
    this.setState({
      Products: "",
      Price: "",
      Category: "",
      Quantity: "",
      url: ""
    });
  };
  // handleUpload = event => {
  //   event.preventDefault();
  //   const storage = firebase.storage();
  //   const { image } = this.state;
  //   const uploadTask = storage.ref(`images/${image.name}`).put(image);
  //   uploadTask.on(
  //     "state_changed",
  //     snapshot => {
  //       // progress function ...
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       this.setState({ progress });
  //     },
  //     error => {
  //       // Error function ...
  //       console.log(error);
  //     },
  //     event => {
  //       // complete function ...
  //       storage
  //         .ref("images")
  //         .child(image.name)
  //         .getDownloadURL()
  //         .then(url => {
  //           this.setState({ url }, () => console.log(this.state.url));
  //         });
  //     }
  //   );
  // };
  render() {
    return (
      <div className="login-container">
        <div className="title">Add a Product</div>

        <div className="forms-1">
          <form className="forms">
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
            <div className="flex-cont">
              <TextField
                className="rr"
                type="file"
                variant="outlined"
                onChange={this.handleFileChange}
              />
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
