import React, { Component } from "react";
import firebase from "../firebase";
import Slideshow from "./slider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import spinner from "../images/Spinner.gif";
import axios from "axios";
import jwt_decode from "jwt-decode";
import HomeCard from "./common/homeCard";
import Footer from "./footer";
import ReviewModal from "./reviewModal";
import Fav from "./common/fav";
import CustomerChat from "./CustomerChat";
import { apiUrl } from "../config.json";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      searched: [],
      ratings: [],
      search: "",
      offset: 0,
      limit: 10,
      ratingModal: false,
      rateLater: false,
      adBrand: false,
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
    };
  }
  componentDidMount() {
    axios
      .post(apiUrl + `/product/gets`, {
        offset: this.state.offset
      })
      .then(res => {
        let newState = this.state.products;
        let products = res.data;
        if (res.data.length > 10) {
          this.setState({ offset: res.data.length });
        }

        for (let product in products) {
          newState.push({
            id: products[product].id,
            Products: products[product].product,
            Brand: products[product].brand,
            Price: products[product].price,
            memPrice: products[product].memPrice,
            Category: products[product].category,
            Quantity: products[product].quantity,
            url: products[product].url,
            fav: products[product].fav
          });
        }
        this.setState({
          products: newState
        });
      });

    axios.post(apiUrl + `/advertisement/saleget`).then(res => {
      let sale = res.data;
      this.setState({ sale });
    });
    axios
      .post(apiUrl + `/advertisement/get`, {
        DOP: this.state.date
      })
      .then(res => {
        let ad = res.data;
        let max = 0;
        let position = 0;
        for (let i = 0; i < ad.length; i++) {
          if (max < ad[i].amount) {
            max = ad[i].amount;
            position = i;
          }
        }
        let ads = res.data[position].brand;

        if (res.data[0].brand) {
          this.setState({ adBrand: ads, discount: max });
        }
      })
      .catch(error => {
        console.log("error--" + error);
      });
    if (localStorage.getItem("token")) {
      const decoded = jwt_decode(localStorage.getItem("token"));
      const userId = decoded.email;

      let isLater = false;
      if (localStorage.getItem("reviewLater")) {
        isLater = localStorage.getItem("reviewLater");
      }
      axios
        .post(apiUrl + `/order/items`, {
          userId
        })
        .then(res => {
          let ratings = res.data;
          let newState = [];
          for (let rating in ratings) {
            if (
              ratings[rating].tracking === "Delivered" &&
              ratings[rating].rating === "false"
            ) {
              newState.push({
                Oid: ratings[rating].id,
                id: ratings[rating].Product.id,
                products: ratings[rating].Product.product,
                Category: ratings[rating].Product.category,
                url: ratings[rating].Product.url,
                rating: ratings[rating].rating,
                tracking: ratings[rating].tracking,
                rateLater: false
              });
            }
          }
          this.setState({
            ratings: newState,
            rateLater: isLater
          });
          this.handleModalOpen();
        })
        .catch(error => {
          this.setState({ error: error });
        });
    }
  }

  handleModalOpen = () => {
    this.state.ratings.length > 0 && this.state.rateLater !== "true"
      ? this.setState({ ratingModal: true })
      : this.setState({ ratingModal: false });
    return true;
  };
  handleModalClose = () => {
    this.setState({ ratingModal: false, rateLater: true });
    localStorage.setItem("reviewLater", "true");
  };
  handleBuy = event => {
    const product = event.target.id;
    const price = event.target.name;

    let cart = "";
    let table = "";
    let carts = "";
    const decoded = jwt_decode(localStorage.getItem("token"));
    const userId = decoded.id;

    axios
      .post(apiUrl + `/cartItem/add`, {
        userId,
        product,
        price: price,
        combo: "false"
      })
      .then(res => {
        res.data !== "item exits"
          ? toast.success("Item Added to cart !", {
              position: toast.POSITION.TOP_CENTER
            })
          : toast.error("Item Already Exits in cart !", {
              position: toast.POSITION.TOP_CENTER
            });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };
  handleOut = () => {
    toast.error("Item Out of Stock", {
      position: toast.POSITION.TOP_CENTER
    });
  };
  handleFav = async event => {
    let favorite = event.target.name;

    let bool = event.target.value;

    if (bool === "false") {
      let fav = "";
      let table = "";
      let favs = "";
      let prod = "";
      let index = "";
      let pro = this.state.products;
      const decoded = jwt_decode(localStorage.getItem("token"));
      const userId = decoded.id;
      await axios
        .post(apiUrl + `/favItem/add`, {
          userId,
          favorite
        })
        .then(res => {
          for (let i = 0; i < pro.length; i++) {
            if (favorite == pro[i].id) {
              index = i;
            }
          }
          let pros = this.state.products;
          pros[index].fav = true;
          this.setState({ products: pros });
          toast.info("Item Wishlisted !", {
            position: toast.POSITION.TOP_CENTER
          });
        })
        .catch(error => {
          this.setState({ error: error });
        });
    } else {
      this.deleteFav(favorite);
      let prod = "";
    }
  };
  deleteFav = async favorite => {
    let fav = "";
    let table = "";
    let favs = "";
    let index = "";
    let pro = this.state.products;
    const decoded = jwt_decode(localStorage.getItem("token"));
    const userId = decoded.id;
    await axios
      .post(apiUrl + `/favItem/delete`, {
        userId,
        favorite
      })
      .then(res => {
        for (let i = 0; i < pro.length; i++) {
          if (favorite == pro[i].id) {
            index = i;
          }
        }
        let pros = this.state.products;
        pros[index].fav = false;
        this.setState({ products: pros });
        toast.warn("Item Removed from Wishlist !", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };
  handleSearch = async e => {
    let query = e.target.value;
    this.setState({ query, limit: 10 });
    if (query.length > 0)
      await axios
        .post(apiUrl + `/product/search`, {
          query,
          limit: this.state.limit
        })
        .then(res => {
          let temp = res.data;
          let products = res.data;
          let newState = [];
          for (let product in products) {
            newState.push({
              id: products[product]._id,
              Products: products[product]._source.product,
              Brand: products[product]._source.brand,
              Price: products[product]._source.price,
              memPrice: products[product]._source.memPrice,
              Category: products[product]._source.category,
              Quantity: products[product]._source.quantity,
              url: products[product]._source.url,
              fav: products[product]._source.fav
            });
          }
          this.setState({
            products: [],
            searched: newState
          });
        });
    else {
      this.componentDidMount();
    }
  };
  handleScroll = e => {
    let element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.setState({
        offset: this.state.offset + 10
      });

      this.componentDidMount();
    }
  };
  handleSearchScroll = e => {
    let element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.setState({
        limit: this.state.limit + 10
      });

      axios
        .post(apiUrl + `/product/search`, {
          query: this.state.query,
          limit: this.state.limit
        })
        .then(res => {
          let temp = res.data;
          let products = res.data;
          let newState = [];
          for (let product in products) {
            newState.push({
              id: products[product]._id,
              Products: products[product]._source.product,
              Brand: products[product]._source.brand,
              Price: products[product]._source.price,
              memPrice: products[product]._source.memPrice,
              Category: products[product]._source.category,
              Quantity: products[product]._source.quantity,
              url: products[product]._source.url,
              fav: products[product]._source.fav
            });
          }
          this.setState({
            products: [],
            searched: newState
          });
        });
    }
  };
  render() {
    return (
      <div className="over-hide">
        <div className="slide">
          <Slideshow
            sale={this.state.sale}
            products={this.state.products}
            adBrand={this.state.adBrand}
            discount={this.state.discount}
          />
        </div>
        <ToastContainer autoClose={2000} />
        <hr></hr>
        <div className="search-box">
          <input
            className="sBox"
            type="text"
            onChange={this.handleSearch}
            placeholder="Search for products"
          />
        </div>
        {this.state.products.length !== 0 ? (
          <div className="container" onScroll={this.handleScroll}>
            {this.state.products.length !== 0 ? (
              this.state.products.map(product => {
                return (
                  <div>
                    <HomeCard
                      sale={this.state.sale}
                      product={product}
                      handleBuy={this.handleBuy}
                      handleFav={this.handleFav}
                      handleOut={this.handleOut}
                    />
                  </div>
                );
              })
            ) : (
              <img className="load" src={spinner} />
            )}
            {this.state.ratings !== null ? (
              <ReviewModal
                ratings={this.state.ratings}
                ratingModal={this.state.ratingModal}
                handleModalClose={this.handleModalClose}
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="container" onScroll={this.handleSearchScroll}>
            {this.state.searched.length !== 0 ? (
              this.state.searched.map(product => {
                return (
                  <div>
                    <HomeCard
                      sale={this.state.sale}
                      product={product}
                      handleBuy={this.handleBuy}
                      handleFav={this.handleFav}
                      handleOut={this.handleOut}
                    />
                  </div>
                );
              })
            ) : (
              <h3>No Result Found!</h3>
            )}
          </div>
        )}
        <CustomerChat />
        <Footer />
      </div>
    );
  }
}
export default Home;
