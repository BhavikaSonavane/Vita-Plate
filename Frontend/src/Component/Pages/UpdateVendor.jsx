import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";

// Lucide Icons
import { UserSquare, MapPin, ImagePlus, KeyRound } from "lucide-react";

function UpdateVendor() {
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
        let ven = JSON.parse(sessionStorage.getItem("vendor"));
        if (!ven) {
            swal("Not Authorized", "", "error");
        } else {
            axios.get(`${IP_ADDRS}/vendors/${ven.id}`, { headers: { "Authorization": `Bearer ${ven.jwt}` } })
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
                .catch((err) => {
                    swal("Something went Wrong", `${err}`, "error");
                });
        }
    }, []);

    const cardInfo = [
        {
            title: "Update Basic Details",
            text: "Firstname, Lastname, Email, Mobile",
            icon: <UserSquare size={64} color="#4e73df" />,
            route: "/updateBasicDetails"
        },
        {
            title: "Update Address",
            text: "Edit address details here",
            icon: <MapPin size={64} color="#1cc88a" />,
            route: "/editAddress"
        },
        {
            title: "Update Profile Picture",
            text: "Upload new profile picture",
            icon: <ImagePlus size={64} color="#36b9cc" />,
            route: "/uploadProfilePicture"
        },
        {
            title: "Change Password",
            text: "Change your password",
            icon: <KeyRound size={64} color="#e74a3b" />,
            route: "/changePassword"
        }
    ];

    return (
        <>
            {loggedIn ? (
                <div style={{ backgroundColor: "#f8f9fc", minHeight: "100vh", paddingBottom: "40px" }}>
                    {/* Header */}
                    <div className="container text-center py-5">
                        <img
                            src={`${IP_ADDRS}/vendors/${vendor.id}/profileImage`}
                            alt="Profile"
                            style={{
                                borderRadius: "50%",
                                border: "4px solid #dee2e6",
                                width: "140px",
                                height: "140px",
                                objectFit: "cover",
                                boxShadow: "0 0 12px rgba(0,0,0,0.1)"
                            }}
                        />
                        <h2 className="mt-4 fw-bold">{vendor.firstName} {vendor.lastName}</h2>
                        <p className="text-muted">{vendor.email}</p>
                    </div>

                    <hr className="my-4" />

                    {/* Cards */}
                    <div className="container">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4">
                            {cardInfo.map((card, idx) => (
                                <div className="col" key={idx}>
                                    <div
                                        className="card h-100 text-center shadow-sm border-0"
                                        onClick={() => navigate(card.route)}
                                        style={{
                                            borderRadius: "1rem",
                                            cursor: "pointer",
                                            paddingTop: "1.5rem",
                                            transition: "transform 0.3s ease, box-shadow 0.3s ease"
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
                                        <div className="mb-3">
                                            {card.icon}
                                        </div>
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

export default UpdateVendor;
