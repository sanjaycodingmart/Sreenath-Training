import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import { imgUrl } from "../../config.json";
import Typography from "@material-ui/core/Typography";

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
    padding: theme.spacing(2, 4, 3)
  }
}));
function getSteps() {
  let stepping = ["Received", "Packed", "Shipped", "Delivered"];

  return stepping;
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `You order is placed Successfully`;
    case 1:
      return `You order is packed Successfully`;
    case 2:
      return `You order is Shipped`;
    case 3:
      return `You order is Delivered`;
    default:
      return "Unknown step";
  }
}

const HistoryCard = ({ product, index }) => {
  let activeStep = 0;
  let steps = getSteps();
  let msg = "";
  if (product.tracking === "Received") {
    activeStep = 0;
  } else if (product.tracking === "Packed") {
    activeStep = 1;
  } else if (product.tracking === "Shipped") {
    activeStep = 2;
  } else if (product.tracking === "Delivered") {
    activeStep = 3;
  }
  const classes = useStyles();

  var time = moment(product.boughtDate).format("DD-MM-YYYY h:mm:ss");

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="history-card" key={index}>
      <img className="history-img" src={imgUrl + product.url[0]} alt="poster" />
      <div className="history-detail">
        <div className="history-name">{product.Products}</div>
        <hr></hr>
        <div className="history-category">{product.Category}</div>
        <div className="history-price">&#8377;{product.Price}</div>
      </div>

      <div className="history-date">Bought On: {time}</div>

      <div className="history-delivey">
        <p>
          {product.tracking !== "Delivered"
            ? `Est. Delivery by: ${product.estDD}`
            : `Your product delivered on:${product.estDD}`}
        </p>
      </div>

      <hr></hr>
      <div className="history-buttons">
        {product.canReturn ? (
          <div>
            <Link className="Links" to={`return/${product.orderId}`}>
              <button className="return-bu">Return</button>
            </Link>
          </div>
        ) : (
          ""
        )}
        <div>
          <button className="track-bu" type="button" onClick={handleOpen}>
            Track
          </button>
        </div>
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
            <div className={classes.root}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <Typography>{getStepContent(index, msg)}</Typography>
                    </StepContent>
                  </Step>
                ))}

                <div className="history-category">
                  <p>
                    {product.tracking !== "Delivered"
                      ? `Est. Delivery by: ${product.estDD}`
                      : `Your product delivered on:${product.estDD}`}
                  </p>
                </div>
              </Stepper>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default HistoryCard;
