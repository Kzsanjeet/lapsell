"use client"
import React,{Component} from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../globalCss/carousel.css"

// import { Component } from "react";
import Slider from "react-slick";

const data = [
    {
        id:1,
        img:"https://mudita.com.np/media/catalog/product/cache/5f4a658faeee583187031a67361d4d52/a/c/acer-aspire-14-core-5-price-in-nepal.webp"
    },
    {
        id:2,
        img:"https://blogs.windows.com/wp-content/uploads/prod/sites/2/2016/09/Dell-Sept-14.jpg"
    },
    {
        id:3,
        img:"https://sgp1.digitaloceanspaces.com/itechstore/itechstore/items/apple_14-inch_macbook-pro_laptop.jpg"
    }
]

function Carousel() {
  var settings = {
    dots: true,  // it shows the dots on carousel
    infinite: true, // if we want to scroll the carousel for infinitely
    slidesToShow:1, // for how many slides we want to show
    slidesToScroll: 1, // for how many slides we want to scroll on click of arrow
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true 
  };
  return (
    <div className="slider-container pt-24">
      <Slider {...settings}>
        {data.map((images) => (
          <div key={images.id} className="slide-item">
            <img src={images.img} alt="image" className="slide-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
