import React from "react";
import HorizontalCard from "./HorizontalCard";
import marathiImg from "../../Images/whats cooking/marathi.png";
import southIndImg from "../../Images/whats cooking/southIndian.png";
import gujratiImg from "../../Images/whats cooking/gujrati.png";
import kashmiriImg from "../../Images/whats cooking/kashmiri.png";
import bengaliImg from "../../Images/whats cooking/bengali.png";
import punjabiImg from "../../Images/whats cooking/punjabi.png";
import bihariImg from "../../Images/whats cooking/bihari.png";
import hydrabadiImg from "../../Images/whats cooking/hyderabadi.png";
import northImg from "../../Images/whats cooking/northeastern.png";
import rajsthaniImg from "../../Images/whats cooking/rajasthani.png";
const Bannertwo = () => {
  const whatsCooking = [
    {
      image: marathiImg,
      title: "Maharashtrian",
      
    },
    {
      image: southIndImg,
      title: "South Indian",
      
    },
    {
      image: gujratiImg,
      title: "Gujrati",
    },
    {
      image: kashmiriImg,
      title: "Kashmiri",
    },
    {
      image: bengaliImg,
      title: "Begali",
    },
    {
      image: punjabiImg,
      title: "Punjabi",
    },
    {
      image: bihariImg,
      title: "Bihari",
    },
    {
      image: hydrabadiImg,
      title: "Hydrabadi",
    },
    {
      image: northImg,
      title: "North Indian",
    },
    {
      image: rajsthaniImg,
      title: "Rajsthani",
    },
  ];

  return (
    <div>
        <h2>Whats cooking</h2>
      <HorizontalCard cardsData={whatsCooking} />
    </div>
  );
};

export default Bannertwo;
