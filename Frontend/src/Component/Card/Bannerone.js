import React from "react";
import HorizontalCard from "./HorizontalCard";

const Bannerone = () => {
  const subscriptionSteps = [
    {
      image: "https://cdn-icons-png.flaticon.com/512/5223/5223909.png",
      title: "1. Select Vendor",
      
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/5234/5234307.png",
      title: "2. Select Subscription",
      
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/6160/6160200.png",
      title: "3. Buy Subscription",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/1484/1484924.png",
      title: "4. Fill Address",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/6963/6963703.png",
      title: "5. Checkout Payment",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/12311/12311714.png",
      title: "6. Order Placed",
    },
  ];

  return (
    <div>
      <HorizontalCard cardsData={subscriptionSteps} />
    </div>
  );
};

export default Bannerone;
