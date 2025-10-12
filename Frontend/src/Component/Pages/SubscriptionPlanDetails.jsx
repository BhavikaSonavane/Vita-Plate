import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";
import Card from "../Card/CardUI";
import { Modal } from "react-bootstrap";

const SubscriptionPlanDetails = () => {
  const [subscriptionPlan, setSubcriptionPlan] = useState([]);
  const navigate = useNavigate();
  const { spid } = useParams();
  const [subPlanList, setSubPlanList] = useState([]);
  const [userRoleCust, setUserRoleCust] = useState(false);
  const [custId, setCustId] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("customer"));
    if (data != null) {
      setUserRoleCust(true);
      setCustId(data.id);
    } else {
      setUserRoleCust(false);
    }

    axios
      .get(`${IP_ADDRS}/subscription/plan/${spid}`)
      .then((res) => {
        console.log(res.data);
        setSubcriptionPlan(res.data);
      })
      .catch((err) => {
        console.log(err);
        swal("Something went Wrong", "", "error");
      });

    axios
      .get(`${IP_ADDRS}/tiffins/getTiffinsBySubscriptionId/${spid}`)
      .then((res) => {
        console.log(res.data);
        setSubPlanList(res.data);
      })
      .catch((err) => console.log(err));
  }, [spid]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpay();

    if (!res) {
      swal("Razorpay SDK failed to load. Are you online?", "", "error");
      return;
    }

    const options = {
      key: "rzp_test_qbK6CnMan8cXto",
      amount: subscriptionPlan.price * 100, // Convert to paise
      currency: "INR",
      name: "Subscription Plan Payment",
      description: `Pay for ${subscriptionPlan.name}`,
      image: "https://example.com/logo.png", // Add a relevant logo URL
      handler: function (response) {
        console.log("Payment successful:", response);
        swal("Payment Successful", `Payment ID: ${response.razorpay_payment_id}`, "success").then(
          () => {
            let orderDto = { customerId: custId, subscriptionId: [spid] };
            axios
              .post(`${IP_ADDRS}/orders/newOrder`, orderDto)
              .then(() => swal("Order Placed", "", "success"))
              .catch(() => swal("Something Went Wrong", "", "error"));
          }
        );
      },
      prefill: {
        name: "Your Name",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <div className="jumbotron" style={{ marginLeft: 20 }}>
        <h1 className="display-4">
          {subscriptionPlan.name}
          <img
            src={`${IP_ADDRS}/subscription/${spid}/dp`}
            style={{ float: "right", margin: 18 }}
            height={165}
            width={165}
            alt="Subscription Plan"
          />
        </h1>
        <p style={{ marginLeft: 30 }}>
          <b>Description :</b> {subscriptionPlan.description}
        </p>
        <p style={{ marginLeft: 30 }}>
          <b>Plan Type :</b> {subscriptionPlan.planType}
        </p>
        <p style={{ marginLeft: 30 }}>
          <b>Price :</b> {subscriptionPlan.price} /- Rs
        </p>

        {userRoleCust ? (
          <button className="btn btn-primary" style={{ marginLeft: 30 }} onClick={handleRazorpayPayment}>
            Buy
          </button>
        ) : (
          ""
        )}
      </div>
      <hr className="my-4" />
      <div className="container">
        <h2 style={{ margin: "25px" }}>Plan Details</h2>
      </div>
      <div className="container">
        <div className="row row-cols-3 row-cols-md-4 g-4">
          {subPlanList.map((v) => (
            <div className="col" key={v.id}>
              <Card
                imgsrc={`${IP_ADDRS}/tiffins/${v.id}/tiffinImage`}
                name={v.day}
                resrc={`tiffin/${spid}`}
                id={v.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlanDetails;
