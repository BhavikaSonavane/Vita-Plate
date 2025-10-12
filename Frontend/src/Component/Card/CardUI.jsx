import React from "react";
import { useNavigate } from "react-router-dom";
import { ChefHat, PackageSearch, ShoppingBag, Users } from "lucide-react";
import "./CardStyle.css";

const iconMap = {
  catering: <ChefHat size={64} strokeWidth={1.5} />,
  packages: <PackageSearch size={64} strokeWidth={1.5} />,
  orders: <ShoppingBag size={64} strokeWidth={1.5} />,
  users: <Users size={64} strokeWidth={1.5} />
};

const Card = ({ name, resrc, id }) => {
  const navigate = useNavigate();
  const icon = iconMap[resrc] || <ChefHat size={64} />;

  return (
    <div
      id="cardStyle"
      className="card text-center shadow"
      onClick={() => navigate(`/${resrc}/${id}`)}
    >
      <div className="overflow pt-4">{icon}</div>
      <h4 className="card-title pb-4">{name}</h4>
    </div>
  );
};

export default Card;
