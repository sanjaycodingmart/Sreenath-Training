import React from "react";
import { Slide } from "react-slideshow-image";
import slide1 from "./images/image2.jpg";
import slide2 from "./images/image3.jpg";
import slide3 from "./images/images3.png";

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true
};

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide {...properties}>
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
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slide2})`,
              width: "100%",
              height: "100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "fit",
              backgroundPosition: "center"
            }}
          ></div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slide3})`,
              width: "100%",
              height: "100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "fit",
              backgroundPosition: "center"
            }}
          ></div>
        </div>
      </Slide>
    </div>
  );
};
export default Slideshow;
