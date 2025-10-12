import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  UserCog,
  ClipboardList,
  DollarSign,
  Utensils
} from "lucide-react";

function Customer() {
  const [customer, setCustomer] = useState({
    firstName: "",
    email: "",
    lastName: "",
    id: "",
    jwt: ""
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cust = JSON.parse(sessionStorage.getItem("customer"));
    if (!cust) {
      swal("Not Authorized", "", "error");
    } else {
      axios.get(`${IP_ADDRS}/customers/${cust.id}`)
        .then((res) => {
          setLoggedIn(true);
          setCustomer({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            id: cust.id,
            email: res.data.email,
            jwt: cust.jwt
          });
        })
        .catch(() => swal("Something went Wrong", "", "error"));
    }
  }, []);

  const cardData = [
    {
      title: "Update Profile",
      text: "Update your account details.",
      icon: <UserCog size={48} color="#4e73df" />,
      route: "/updateCustomer"
    },
    {
      title: "View Orders",
      text: "See all your previous and current orders.",
      icon: <ClipboardList size={48} color="#1cc88a" />,
      route: "/viewCustOrder"
    },
    {
      title: "Current Subscription",
      text: "Details about your current plan.",
      icon: <DollarSign size={48} color="#f6c23e" />,
      route: "/customerCurrentPlan"
    },
    {
      title: "Vendors",
      text: "Explore available vendors.",
      icon: <Utensils size={48} color="#e74a3b" />,
      route: "/vendors"
    }
  ];

  return (
    <>
      {loggedIn ? (
        <div style={{ backgroundColor: "#f8f9fc", minHeight: "100vh", paddingBottom: "50px" }}>
          {/* Profile Section */}
          <div className="text-center py-5">
            <img
              src={`${IP_ADDRS}/customers/${customer.id}/profileImage`}
              alt="Profile"
              style={{
                borderRadius: "50%",
                border: "5px solid #dee2e6",
                width: "150px",
                height: "150px",
                objectFit: "cover",
                boxShadow: "0 0 20px rgba(0,0,0,0.1)"
              }}
            />
            <h2 className="mt-4 fw-bold">{customer.firstName} {customer.lastName}</h2>
            <p className="text-muted mb-0">{customer.email}</p>
          </div>

          {/* Action Cards */}
          <div className="container mt-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {cardData.map((card, index) => (
                <div className="col" key={index}>
                  <div
                    className="card h-100 text-center p-4 border-0 shadow-sm"
                    onClick={() => navigate(card.route)}
                    style={{
                      borderRadius: "1rem",
                      background: "#fff",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.05)";
                    }}
                  >
                    <div className="mb-3">{card.icon}</div>
                    <div>
                      <h5 className="fw-semibold">{card.title}</h5>
                      <p className="text-muted small">{card.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <h1>Please log in to access this page</h1>
        </div>
      )}
    </>
  );
}

export default Customer;
