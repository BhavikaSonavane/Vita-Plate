// import React from 'react';
// import HorizontalCard from "./HorizontalCard.css";

// const HorizonatalCard = () => {
//   return (
    
//     <div className="image-card1">
//     <div className="image-container1">
//         <img src="https://cdn-icons-png.flaticon.com/512/5223/5223909.png" alt="Image 3" />
//         <h5>1.Select Vendor</h5>
//         {/* <p>Please refer to returns and exchange section for more details</p> */}
//       </div>
//       <div className="image-container1">
//         <img src="https://cdn-icons-png.flaticon.com/512/5234/5234307.png" alt="Image 1" />
//         <h5>2.Select Subcription</h5>
//         {/* <p>we will deliver your order across india for free</p> */}
//       </div>
//       <div className="image-container1">
//         <img src="https://cdn-icons-png.flaticon.com/512/6160/6160200.png" alt="Image 1" />
//         <h5>3.Buy Subcription</h5>
//         {/* <p>we will deliver your order across india for free</p> */}
//       </div>
//       <div className="image-container1">
//         <img src="https://cdn-icons-png.flaticon.com/512/1484/1484924.png" alt="Image 1" />
//         <h5>4.Fill in Address</h5>
//         {/* <p>we will deliver your order across india for free</p> */}
//       </div>
//       <div className="image-container1">
//         <img src="https://cdn-icons-png.flaticon.com/512/6963/6963703.png" alt="Image 1" />
//         <h5>5.Check out Payment</h5>
//         {/* <p>we will deliver your order across india for free</p> */}
//       </div>
//       <div className="image-container1">
//         <img src="https://cdn-icons-png.flaticon.com/512/12311/12311714.png" alt="Image 2" />
//         <h5>6.Order Placed</h5>
//         {/* <p>Our support team is always there for you</p> */}
//       </div>
      
//     </div>
//   );
// };

// export default HorizonatalCard;


import React from 'react';
import "./HorizontalCard.css";

const HorizontalCard = ({ cardsData =[]}) => {
  console.log("Cards Data:", cardsData);
  return (
    <div className="image-card1">
      {cardsData.map((card, index) => (
        <div key={index} className="image-container1">
          <img src={card.image} alt={card.title} />
          <h5>{card.title}</h5>
          {card.description && <p>{card.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default HorizontalCard;
