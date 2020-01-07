import React, { Component } from "react";
import firebase from "./firebase";
import "firebase/storage";
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      Movie: "",
      Year: "",
      Journal: "",
      image: null,
      url: "",
      progress: 0
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
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    const itemsRef = firebase.database().ref("movies");
    const item = {
      Movie: this.state.Movie,
      Year: this.state.Year,
      Journal: this.state.Journal,
      url: this.state.url
    };
    itemsRef.push(item);
    this.setState({
      Movie: "",
      Year: "",
      Journal: "",
      url: ""
    });
  };
  handleUpload = event => {
    event.preventDefault();
    const storage = firebase.storage();
    const { image } = this.state;
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
      event => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
    console.log(this.state.url);
  };
  render() {
    return (
      <div>
        <h1 className="head">Add a Movie</h1>
        <form className="forms">
          <label className="label">Movie Name</label>
          <input
            className="input"
            type="text"
            name="Movie"
            id="movie"
            value={this.state.Movie}
            onChange={this.handleChange}
          />
          <label className="label">Year</label>
          <input
            className="input"
            type="text"
            name="Year"
            id="year"
            value={this.state.Year}
            onChange={this.handleChange}
          />
          <label className="label">Journal</label>
          <input
            className="input"
            type="text"
            name="Journal"
            id="journal"
            value={this.state.Journal}
            onChange={this.handleChange}
          />
          <div className="flex-cont">
            <label className="label">Poster URL</label>
            <input
              className="rr"
              type="file"
              onChange={this.handleFileChange}
            />
            <button className="buttonr" onClick={this.handleUpload}>
              upload
            </button>
          </div>

          <button className="button" onClick={this.handleSubmit}>
            Add
          </button>
        </form>
      </div>
    );
  }
}
export default Dashboard;
