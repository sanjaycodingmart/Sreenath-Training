import React, { Component } from "react";
import firebase from "../firebase";
import Slideshow from "./slider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import spinner from "../images/Spinner.gif";
import axios from "axios";
import jwt_decode from "jwt-decode";
import HomeCard from "./common/homeCard";
class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <ToastContainer autoClose={2000} />
        <hr></hr>
        <h1>Hello!! Admin</h1>
      </div>
    );
  }
}
export default Home;
