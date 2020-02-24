import React from "react";
import slide1 from "../images/image2.jpg";
import SlideCard from "./common/slideCard";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import { Link } from "react-router-dom";
import DateCountdown from "react-date-countdown-timer";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { imgUrl } from "../config.json";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true
};
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%"
  }
}));

const Slideshow = ({ products, adBrand, discount, sale }) => {
  const classes = useStyles();
  const theme = useTheme();
  let productList = [];

  adBrand
    ? products.map(product => {
        if (product.Brand === adBrand) {
          productList.push(product);
        }
      })
    : (productList = []);

  const [activeStep, setActiveStep] = React.useState(0);
  let maxSteps = 1;
  productList.length !== 0 ? (maxSteps = productList.length) : (maxSteps = 1);
  sale ? (maxSteps = maxSteps + sale.length) : (maxSteps = maxSteps);
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };
  const handleNotify = () => {
    console.log("clicked");
  };
  return (
    <div className="slide-container">
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {productList.length !== 0 ? (
          productList.map((product, index) =>
            product.Brand === adBrand ? (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Link className="Links" to={`product/${product.id}`}>
                    <div className="each-slide">
                      <img
                        className="slider-img"
                        src={imgUrl + product.url[0]}
                        alt="poster"
                      />

                      <div className="slider-name">{product.Products}</div>
                      <div className="slider-category">{product.Category}</div>
                      <div className="slider-price">&#8377;{product.Price}</div>
                      <div className="slider-days">{adBrand + " Day"}</div>
                      <div className="slider-offer">
                        {"UpTo " + discount}&#8377;{" off"}
                      </div>
                    </div>
                  </Link>
                ) : null}
              </div>
            ) : (
              ""
            )
          )
        ) : (
          <div>
            <div className="each-slide">
              <div
                style={{
                  backgroundImage: `url(${slide1})`,
                  width: "100%",
                  height: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "fit",
                  backgroundPosition: "center"
                }}
              ></div>
            </div>
          </div>
        )}
        {sale
          ? sale.map((sale, index) => {
              let saleStart = false;
              let saleEnd = false;
              let saleDate = new Date(sale.DOS);
              let newDate = saleDate - new Date();

              if (newDate < 0) {
                saleStart = true;
              }
              if (newDate < -86400000) {
                saleEnd = true;
              }
              if (newDate < -96400000) {
                sale.DOS = 0;
              }
              return sale.DOS !== 0 ? (
                <div key={index}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <div className="eachSale-slide">
                      <div className="count-head">SALE!!</div>
                      <div className="slider-count">
                        {!saleStart ? (
                          <DateCountdown dateTo={sale.DOS} />
                        ) : !saleEnd ? (
                          <h3>Sale Started!!</h3>
                        ) : (
                          <h3>Thanks For your interest. Sale Ended</h3>
                        )}
                      </div>
                      <div className="sliderCount-days">
                        {sale.brand + " Sale!"}
                      </div>
                      <div className="slider-button">
                        {!saleStart ? (
                          <button className="slider-bu" onClick={handleNotify}>
                            Notify Me
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="sliderCount-offer">
                        {"UpTo " + sale.offer}&#8377;{" off"}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                ""
              );
            })
          : ""}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
};
export default Slideshow;
