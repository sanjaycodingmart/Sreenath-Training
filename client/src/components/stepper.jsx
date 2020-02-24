import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

function getSteps(data) {
  let stepping = ["Requested"];
  stepping.push(data);

  return stepping;
}

function getStepContent(step, msg) {
  const message = msg;
  switch (step) {
    case 0:
      return `You requested to return the product. Please be patient while the seller accepts your request`;
    case 1:
      return message;

    default:
      return "Unknown step";
  }
}

export default function VStepper(props) {
  let activeStep = 0;
  let steps = getSteps();
  let msg = "";
  if (props.data === "pending") {
    activeStep = 0;
  } else if (props.data === "Accepted") {
    msg = `Your request is accepted by the seller. Our executive will collect the product`;
    activeStep = 1;
    steps = getSteps("Accepted");
  } else if (props.data === "Declined") {
    msg = `Sorry! Your request is declined by the seller`;
    activeStep = 1;
    steps = getSteps("Declined");
  } else if (props.data === "Timeout") {
    msg = `Sorry! Your request is timed out`;
    activeStep = 1;
    steps = getSteps("Timeout");
  }
  const classes = useStyles();

  return (
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
      </Stepper>
    </div>
  );
}
