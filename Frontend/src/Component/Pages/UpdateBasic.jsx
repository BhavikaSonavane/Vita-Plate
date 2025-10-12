import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";
import "./UpdateBasic.css"; // Add custom CSS here

function UpdateBasic() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState();
    const [data, setData] = useState({
        firstName: "", email: "", lastName: "", mobile: "", id: "", jwt: "",
    });

    const [Error, setError] = useState({
        first_name_error: "", last_name_error: "", mobile_number_error: "",
    });

    const [flag, setFlag] = useState({
        firstName: true, lastName: true, mobileNumber: true,
    });

    const validateFirstName = (e) => {
        const name = e.target.value;
        if (name === "") {
            setError(prev => ({ ...prev, first_name_error: "Please enter First Name" }));
            setFlag(prev => ({ ...prev, firstName: false }));
        } else {
            setError(prev => ({ ...prev, first_name_error: "" }));
            setFlag(prev => ({ ...prev, firstName: true }));
        }
    };

    const validateLastName = (e) => {
        const name = e.target.value;
        if (name === "") {
            setError(prev => ({ ...prev, last_name_error: "Please enter Last Name" }));
            setFlag(prev => ({ ...prev, lastName: false }));
        } else {
            setError(prev => ({ ...prev, last_name_error: "" }));
            setFlag(prev => ({ ...prev, lastName: true }));
        }
    };

    const validateMobileNumber = (e) => {
        const mobileNumber = e.target.value;
        const mnRegex = /^[0-9]{10}$/;
        if (mnRegex.test(mobileNumber)) {
            setError(prev => ({ ...prev, mobile_number_error: "" }));
            setFlag(prev => ({ ...prev, mobileNumber: true }));
        } else {
            setError(prev => ({ ...prev, mobile_number_error: "Mobile Number should be 10 digits" }));
            setFlag(prev => ({ ...prev, mobileNumber: false }));
        }
    };

    const changeHandler = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const refreshPage = () => window.location.reload();

    useEffect(() => {
        let ven = JSON.parse(sessionStorage.getItem("vendor"));
        if (ven != null) {
            setUserRole("ven");
            axios.get(`${IP_ADDRS}/vendors/${ven.id}`, {
                headers: { "Authorization": `Bearer ${ven.jwt}` }
            }).then(res => {
                const { firstName, lastName, email, mobile } = res.data;
                setData({ firstName, lastName, email, mobile, id: ven.id, jwt: ven.jwt });
            }).catch(err => swal("Something went Wrong", `${err}`, "error"));
        } else {
            let cust = JSON.parse(sessionStorage.getItem("customer"));
            if (cust != null) {
                setUserRole("cust");
                axios.get(`${IP_ADDRS}/customers/${cust.id}`, {
                    headers: { "Authorization": `Bearer ${cust.jwt}` }
                }).then(res => {
                    const { firstName, lastName, email, mobile } = res.data;
                    setData({ firstName, lastName, email, mobile, id: cust.id, jwt: cust.jwt });
                }).catch(err => swal("Something went Wrong", `${err}`, "error"));
            } else {
                swal("Relogin to Access this Page", "", "error");
                sessionStorage.clear();
                navigate("/sign-in");
            }
        }
    }, []);

    const submitData = (e) => {
        e.preventDefault();
        const url = userRole === "ven" ? `${IP_ADDRS}/vendors` : `${IP_ADDRS}/customers`;
        axios.put(url, data, { headers: { "Authorization": `Bearer ${data.jwt}` } })
            .then(res => {
                swal(`${res.data}`, "", "success");
                navigate(userRole === "ven" ? "/vendor" : "/customer");
            })
            .catch(err => swal(`${err.response?.data || "Update failed"}`, "", "error"));
    };

    return (
        <div className="update-basic-wrapper">
            <div className="card update-basic-card shadow-lg p-4">
                <h2 className='text-center mb-4'>Update Information</h2>
                <form onSubmit={submitData}>
                    <div className="form-group mb-3">
                        <label><b>First Name:</b></label>
                        <input
                            type="text"
                            name="firstName"
                            value={data.firstName}
                            onChange={changeHandler}
                            onBlur={validateFirstName}
                            className="form-control"
                            placeholder="First Name"
                        />
                        <span className="text-danger">{Error.first_name_error}</span>
                    </div>

                    <div className="form-group mb-3">
                        <label><b>Last Name:</b></label>
                        <input
                            type="text"
                            name="lastName"
                            value={data.lastName}
                            onChange={changeHandler}
                            onBlur={validateLastName}
                            className="form-control"
                            placeholder="Last Name"
                        />
                        <span className="text-danger">{Error.last_name_error}</span>
                    </div>

                    <div className="form-group mb-3">
                        <label><b>Email:</b></label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            className="form-control"
                            readOnly
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label><b>Mobile Number:</b></label>
                        <input
                            type="text"
                            name="mobile"
                            value={data.mobile}
                            onChange={changeHandler}
                            onBlur={validateMobileNumber}
                            className="form-control"
                            placeholder="10-digit mobile number"
                        />
                        <span className="text-danger">{Error.mobile_number_error}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-success px-4">Update</button>
                        <button type="button" className="btn btn-secondary px-4" onClick={refreshPage}>Reset</button>
                        <button
                            type="button"
                            className="btn btn-danger px-4"
                            onClick={() => navigate(userRole === "ven" ? "/vendor" : "/customer")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateBasic;
