import React from "react";
import Slider from "../Carousal/slider";
import Cards from "../Card/VendorCards";
import "../../index.css";

const Home = () => {
  return (
    <div className="bg-light">
      <Slider />

      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#AA336A" }}>
            🍱 Mess Vendors
          </h2>
          <p className="text-muted">
            Browse verified tiffin providers offering fresh, affordable meals.
          </p>
        </div>

        <Cards />
      </section>
    </div>
  );
};

export default Home;
