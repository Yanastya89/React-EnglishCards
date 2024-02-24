import React from "react";
import Slider from "react-slick";
import Card from "../Card/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import wordsData from "../../data/wordlist.json";

const CardSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {wordsData.words.map((word) => (
        <Card key={word.id} {...word} />
      ))}
    </Slider>
  );
};

export default CardSlider;
