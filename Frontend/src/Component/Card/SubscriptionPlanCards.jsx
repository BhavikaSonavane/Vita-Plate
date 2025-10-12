import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";
import { Link } from "react-router-dom";
import "./SP_Cards.css"; // Custom styles

const SP_Cards = ({ id }) => {
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${IP_ADDRS}/vendors/getAllAvaliablePlanByVendorId/${id}`)
      .then((res) => {
        setSubscriptionPlans(res.data);
      })
      .catch((err) => {
        console.error(err);
        swal("Something went wrong", "", "error");
      });
  }, [id]);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {subscriptionPlans.map((sp) => (
          <div className="col" key={sp.id}>
            <div className="card sp-card text-center">
              {/* Circular Profile Image */}
              <div className="circular-img-container mx-auto">
                <img
                  src={`${IP_ADDRS}/subscription/${sp.id}/dp`}
                  alt={sp.name}
                />
              </div>

              <div className="card-body">
                <h5 className="card-title">{sp.name}</h5>
                <p className="card-text">
                  {sp.description || "No description available."}
                </p>
                <Link to={`/subscription/plan/${sp.id}`} className="btn btn-primary w-100">
                  View Plan
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SP_Cards;
