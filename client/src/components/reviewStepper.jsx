import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { apiUrl } from "../config.json";
import { imgUrl } from "../config.json";
const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75"
  },
  iconHover: {
    color: "#ff3d47"
  }
})(Rating);

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
    height: 200,
    maxWidth: 100,
    overflow: "hidden",
    display: "block",
    width: "200"
  }
}));

export default function ReviewStepper({ ratings, modalClose }) {
  const rate = ratings;
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = rate.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  let Oids = null;
  let productRating = null;
  const handleReviewSubmit = (e, value, id) => {
    Oids = id;
    productRating = value;
  };
  const handleRateSubmit = async () => {
    await axios
      .post(apiUrl + `/order/updatereview`, {
        Oids,
        productRating
      })
      .then(res => {
        if (maxSteps > 1) {
          setActiveStep(prevActiveStep => prevActiveStep + 1);
        } else {
          modalClose();
        }
      });
  };
  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{rate[activeStep].products}</Typography>
      </Paper>
      <img
        className={classes.img}
        src={imgUrl + rate[activeStep].url[0]}
        alt={rate[activeStep].products}
      />
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rate this Product</Typography>
        <StyledRating
          name={rate[activeStep].products}
          defaultValue={0}
          getLabelText={value => `${value} Heart${value !== 1 ? "s" : ""}`}
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          onChange={(event, name, value) => {
            handleReviewSubmit(event, name, rate[activeStep].Oid);
          }}
        />
      </Box>
      <Button onClick={handleRateSubmit}>Submit Review</Button>
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
}
