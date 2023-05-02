import React, { Component } from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";

import food1 from "../../Image/pizza.jpg";
import food2 from "../../Image/main2.jpg";
import food3 from "../../Image/foodImg.jpg";
import food4 from "../../Image/foodImg2.jpg";
import { Img } from "./SimpleSliderSty";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div>
        <h2> </h2>
        <Slider {...settings}>
          <div>
            <Img src={food1} alt="food1" />
          </div>
          <div>
            <Img src={food2} alt="food2" />
          </div>
          <div>
            <Img src={food3} alt="food3" />
          </div>
          <div>
            <Img src={food4} alt="food4" />
          </div>
        </Slider>
      </div>
    );
  }
}
