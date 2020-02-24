import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../config.json";
import { imgUrl } from "../config.json";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    height: "700px"
  }
}));

export default function CompareModal({ data, product, handle }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const [bgPosition, setbgPosition] = React.useState("0% 0%");
  const [opi, setOpi] = React.useState("0");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handle();
  };
  let item = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < product.length; j++) {
      if (data[i] == product[j].id) {
        item.push(product[j]);
      }
    }
  }
  const handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setbgPosition(`${x}% ${y}%`);
    setOpi("100");
    // this.setState({ backgroundPosition: `${x}% ${y}%` });
  };
  const handleMouseLeave = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    setbgPosition(`0% 0%`);
    setOpi("0");
    // this.setState({ backgroundPosition: `${x}% ${y}%` });
  };
  const handleBuy = event => {
    const product = event.target.id;
    const price = event.target.value;

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

  return (
    <div>
      {/* <button type="button" className="bu" onClick={handleOpen}>
        COMPARE {data.length} Items
      </button> */}
      <ToastContainer autoClose={2000} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Table className={classes.table} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Picture</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="center">Buy Now</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item.map(product => (
                  <TableRow key={product.id}>
                    <TableCell component="th" scope="row">
                      {product.Products}
                    </TableCell>
                    <TableCell>
                      <div className="compare-img">
                        <figure
                          onMouseMove={handleMouseMove}
                          onMouseLeave={handleMouseLeave}
                        >
                          <img
                            className="magnigy"
                            //   style={{}}
                            src={imgUrl + product.url[0]}
                          />
                        </figure>
                        <div className="figure-container">
                          <div
                            className="figure"
                            //   onMouseMove={handleMouseMove}
                            //   onMouseLeave={handleMouseLeave}
                            style={{
                              opacity: opi,
                              backgroundPosition: bgPosition,
                              backgroundImage: `url(${imgUrl + product.url[0]})`
                            }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="right">{product.Price}</TableCell>
                    <TableCell align="right">{product.Category}</TableCell>
                    <TableCell align="right">
                      <div className="buton">
                        <button
                          id={product.id}
                          value={product.Price}
                          onClick={handleBuy}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
