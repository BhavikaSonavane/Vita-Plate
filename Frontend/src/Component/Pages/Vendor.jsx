import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";
import "bootstrap/dist/css/bootstrap.min.css";

// Lucide Icons
import {
  UserCog,
  PlusCircle,
  Layers,
  ToggleRight,
  ToggleLeft
} from "lucide-react";

function Vendor() {
  const [vendor, setVendor] = useState({
    firstName: "",
    email: "",
    lastName: "",
    id: "",
    jwt: ""
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ven = JSON.parse(sessionStorage.getItem("vendor"));
    if (!ven) {
      swal("Not Authorized", "", "error");
    } else {
      axios.get(`${IP_ADDRS}/vendors/${ven.id}`)
        .then((res) => {
          setLoggedIn(true);
          setVendor({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            id: ven.id,
            email: res.data.email,
            jwt: ven.jwt
          });
        })
        .catch(() => {
          swal("Something went wrong", "", "error");
        });
    }
  }, []);

  const cardInfo = [
    {
      title: "Update Profile",
      text: "Update your account details.",
      icon: <UserCog size={64} color="#4e73df" />,
      route: "/updateVendor"
    },
    {
      title: "Add Subscription Plan",
      text: "Add new Subscription Plan details.",
      icon: <PlusCircle size={64} color="#1cc88a" />,
      route: "/addSubcriptionPlan"
    },
    {
      title: "Display Subscription Plans",
      text: "Show all added Subscription Plans.",
      icon: <Layers size={64} color="#36b9cc" />,
      route: "/vendorAllPlans"
    },
    {
      title: "Enabled Subscription Plan",
      text: "Show Enabled Subscription Plans.",
      icon: <ToggleRight size={64} color="#f6c23e" />,
      route: "/enabledPlans"
    },
    {
      title: "Disabled Subscription Plans",
      text: "Show Disabled Subscription Plans.",
      icon: <ToggleLeft size={64} color="#e74a3b" />,
      route: "/disabledPlans"
    }
  ];

  return (
    <>
      {loggedIn ? (
        <div style={{ backgroundColor: "#f8f9fc", minHeight: "100vh", paddingBottom: "40px" }}>
          {/* Profile Section */}
          <div className="text-center py-5">
            <img
              src={`${IP_ADDRS}/vendors/${vendor.id}/profileImage`}
              alt="Vendor Profile"
              style={{
                borderRadius: "50%",
                border: "5px solid #dee2e6",
                width: "150px",
                height: "150px",
                objectFit: "cover",
                boxShadow: "0 0 15px rgba(0,0,0,0.1)"
              }}
            />
            <h2 className="mt-4 fw-bold">{vendor.firstName} {vendor.lastName}</h2>
            <p className="text-muted mb-0">{vendor.email}</p>
          </div>

          {/* Action Cards */}
          <div className="container mt-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
              {cardInfo.map((card, idx) => (
                <div className="col" key={idx}>
                  <div
                    className="card h-100 shadow-sm border-0 text-center"
                    onClick={() => navigate(card.route)}
                    style={{
                      borderRadius: "1rem",
                      cursor: "pointer",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      paddingTop: "1.5rem"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.06)";
                    }}
                  >
                    <div className="mb-3">{card.icon}</div>
                    <div className="card-body">
                      <h5 className="card-title fw-semibold">{card.title}</h5>
                      <p className="card-text text-muted small">{card.text}</p>
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

export default Vendor;
