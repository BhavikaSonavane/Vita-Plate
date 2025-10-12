import React from "react";
import HorizontalCard from "./HorizontalCard";
import festivalImg from "../../Images/whats your crave/Festival.png";
import comboImg from "../../Images/whats your crave/combo.png";
import jainImg from "../../Images/whats your crave/jain.png";
import healthyImg from "../../Images/whats your crave/healthy.png";
import nonvegImg from "../../Images/whats your crave/nonVeg.png";
import westernImg from "../../Images/whats your crave/western.png";
import sweetsImg from "../../Images/whats your crave/sweets.png";
import saladImg from "../../Images/whats your crave/salad.png";
import snacksImg from "../../Images/whats your crave/snacks.png";
import gourmetImg from "../../Images/whats your crave/gourmet.png";

const Bannerthree = () => {
  const whatsCooking = [
    {
      image: festivalImg,
      title: "Festival Thali",
      
    },
    {
      image: comboImg,
      title: "Combo",
      
    },
    {
      image: jainImg,
      title: "Jain Thali",
    },
    {
      image: healthyImg,
      title: "Healthy",
    },
    {
      image: nonvegImg,
      title: "Non-Veg",
    },
    {
      image: westernImg,
      title: "Western Thali",
    },
    {
      image: sweetsImg,
      title: "Sweets",
    },
    {
      image: saladImg,
      title: "Salad",
    },
    {
      image: snacksImg,
      title: "Snacks",
    },
    {
      image: gourmetImg,
      title: "Gourmet",
    },
  ];

  return (
    <div>
        <h2>Whats Your Crave</h2>
      <HorizontalCard cardsData={whatsCooking} />
    </div>
  );
};

export default Bannerthree;
