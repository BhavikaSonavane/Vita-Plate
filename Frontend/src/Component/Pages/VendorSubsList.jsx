import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../index.css";
import axios from "axios";
import swal from "sweetalert";
import SP_Cards from "../Card/SubscriptionPlanCards";
import { IP_ADDRS } from "../../Service/Constant";

const VendorSubsList = () => {
  const [vendorDetails, setVendorDetails] = useState({});
  const [vendorAddress, setVendorAddress] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${IP_ADDRS}/vendors/${id}`)
      .then((res) => {
        setVendorDetails(res.data);
      })
      .catch((err) => {
        console.error(err);
        swal("Something went wrong while fetching vendor details", "", "error");
      });

    axios
      .get(`${IP_ADDRS}/vendors/${id}/addresses`)
      .then((res) => {
        if (res.data.length > 0) setVendorAddress(res.data[0]); // fix for array issue
      })
      .catch((err) => {
        console.error(err);
        swal("Something went wrong while fetching address", "", "error");
      });
  }, [id]);

  return (
    <div>
      <div className="jumbotron" style={{ marginLeft: 20 }}>
        <h1 className="display-4">
          {vendorDetails?.firstName} {vendorDetails?.lastName}
          <img
            src={`${IP_ADDRS}/vendors/${id}/profileImage`}
            alt="Vendor Profile"
            style={{ float: "right", margin: 18 }}
            height={165}
            width={165}
          />
        </h1>
        <p style={{ marginLeft: 30 }}>
          {vendorAddress?.line1}, {vendorAddress?.line2}
        </p>
        <p style={{ marginLeft: 30 }}>
          {vendorAddress?.city}, {vendorAddress?.pincode}
        </p>
        <p style={{ marginLeft: 30 }}>{vendorAddress?.state}</p>
      </div>
      <hr className="my-4" />
      <div className="container">
        <h2 style={{ margin: "25px" }}>Subscription Plans</h2>
        <SP_Cards id={id} />
      </div>
    </div>
  );
};

export default VendorSubsList;
