import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2020/X-site/SingleTitle/TheBoyss2/1500x600_Hero-Tall_p._CB404993995_.jpg"
          alt=""
        />

        <div className="home__row">
          <Product
            id={1001}
            title="Attitude Is Everything: Change Your Attitude ... Change Your Life! Paperback – 15 May 2015"
            price="30"
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/41F8ATXoMOL._SX317_BO1,204,203,200_.jpg"
          />
          <Product
            id={1002}
            title="Sony Digital Vlog Camera ZV 1 (Compact, Video Eye AF, Flip Screen, in-Built Microphone, Bluetooth...."
            price="1000"
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/71Ds%2B2u06zL._SL1500_.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id={1003}
            title="JBL Quantum 200 Wired Over-Ear Gaming Headset with..."
            price="70"
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/61rsTjyWIGL._SL1500_.jpg"
          />
          <Product
            id={1004}
            title="OnePlus Bullets Wireless Z in-Ear Bluetooth..."
            price="49.99"
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/616bhfyXimL._SL1500_.jpg"
          />
          <Product
            id={1005}
            title="Apple Watch Series 5 (GPS, 44mm) - Space Gray Aluminium..."
            price="739.00"
            rating={5}
            image="https://images-na.ssl-images-amazon.com/images/I/71wu%2BHMAKBL._SL1500_.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id={1006}
            title="LG 34 inch Curved 21:9 Ultrawide Monitor - WQHD, IPS Panel with, HDMI, Display, USB, Thunderbolt Ports - 34UC98 (Black/Silver)"
            price="1153.60"
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/418fPJ7pn3L.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
