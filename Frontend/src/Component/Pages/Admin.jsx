import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";

function Admin() {
    const [admin, setAdmin] = useState({
        email: "",
        id: "",
        jwt: ""
    });

    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let adm = JSON.parse(sessionStorage.getItem("admin"));
        if (adm == null) {
            swal("Not Authorized", "", "error");
        } else {
            setLoggedIn(true);
            setAdmin({
                id: adm.id,
                email: adm.email,
                jwt: adm.jwt
            });
        }
    }, []);

    const cardData = [
        {
            title: "Approved Vendors",
            text: "List of All Vendors",
            img: "https://cdn-icons-png.flaticon.com/512/3712/3712170.png",
            route: "/getAllApprovedVendors"
        },
        {
            title: "Get All Customers",
            text: "List of All Customers",
            img: "https://cdn-icons-png.flaticon.com/512/7909/7909958.png",
            route: "/getAllCustomers"
        },
        {
            title: "Unapproved Vendors",
            text: "List of All Unapproved Vendors",
            img: "https://cdn-icons-png.flaticon.com/512/10806/10806362.png",
            route: "/getUnapprovedVendors"
        },
        {
            title: "Blocked Vendors",
            text: "List of Blocked Vendors",
            img: "https://cdn-icons-png.flaticon.com/512/4712/4712929.png",
            route: "/getBlockedVendors"
        }
    ];

    return (
        <>
            {loggedIn ? (
                <>
                    <div className="container mt-5">
                        <div className="text-center mb-5">
                            <h2 className="fw-bold">Admin Dashboard</h2>
                            <p className="text-muted">Welcome, <strong>{admin.email}</strong></p>
                        </div>

                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                            {cardData.map((card, index) => (
                                <div className="col" key={index}>
                                    <div
                                        className="card h-100 shadow-sm border-0 rounded-4"
                                        onClick={() => navigate(card.route)}
                                        style={{
                                            cursor: "pointer",
                                            transition: "all 0.3s ease-in-out"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-5px)";
                                            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)";
                                        }}
                                    >
                                        <img
                                            src={card.img}
                                            className="card-img-top p-4"
                                            alt={card.title}
                                            style={{ height: '160px', objectFit: 'contain' }}
                                        />
                                        <div className="card-body text-center">
                                            <h5 className="card-title fw-semibold mb-2">{card.title}</h5>
                                            <p className="card-text text-muted small">{card.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center mt-5">
                    <h1 className="fw-bold text-danger">Access Denied</h1>
                    <p className="lead text-muted">Please log in as admin to access this page.</p>
                </div>
            )}
        </>
    );
}

export default Admin;
