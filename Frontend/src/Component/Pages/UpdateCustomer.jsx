import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  UserCog,
  MapPin,
  ImagePlus,
  KeyRound
} from "lucide-react";

function UpdateCustomer() {
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
    let cust = JSON.parse(sessionStorage.getItem("customer"));
    if (!cust) {
      swal("Not Authorized", "", "error");
    } else {
      axios.get(`${IP_ADDRS}/customers/${cust.id}`, {
        headers: { Authorization: `Bearer ${cust.jwt}` }
      })
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
        .catch((err) => {
          swal("Something went wrong", `${err}`, "error");
        });
    }
  }, []);

  const cardItems = [
    {
      title: "Update Basic Details",
      text: "Firstname, Lastname, Email, Mobile",
      icon: <UserCog size={48} color="#4e73df" />,
      route: "/updateBasicDetails"
    },
    {
      title: "Update Address",
      text: "Edit address details here",
      icon: <MapPin size={48} color="#1cc88a" />,
      route: "/editAddress"
    },
    {
      title: "Update Profile Picture",
      text: "Upload new profile picture",
      icon: <ImagePlus size={48} color="#f6c23e" />,
      route: "/uploadProfilePicture"
    },
    {
      title: "Change Password",
      text: "Change your password",
      icon: <KeyRound size={48} color="#e74a3b" />,
      route: "/changePassword"
    }
  ];

  if (!loggedIn) {
    return (
      <div className="text-center mt-5">
        <h1>Please Log in to Access this page</h1>
      </div>
    );
  }

  return (
    <>
      {/* Header/Profile */}
      <div className="jumbotron text-center py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <img
          src={`${IP_ADDRS}/customers/${customer.id}/profileImage`}
          className="rounded-circle shadow"
          alt="Profile"
          height={130}
          width={130}
          style={{ objectFit: "cover", marginBottom: "1rem" }}
        />
        <h2 className="fw-bold">{customer.firstName} {customer.lastName}</h2>
        <p className="text-muted">{customer.email}</p>
      </div>

      {/* Action Cards */}
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {cardItems.map((card, idx) => (
            <div className="col" key={idx}>
              <div
                className="card h-100 text-center border-0 shadow-sm"
                style={{
                  borderRadius: "1rem",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer"
                }}
                onClick={() => navigate(card.route)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center py-4">
                  <div className="mb-3">{card.icon}</div>
                  <h5 className="card-title fw-semibold">{card.title}</h5>
                  <p className="text-muted small">{card.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UpdateCustomer;
