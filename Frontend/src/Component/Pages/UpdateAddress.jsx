import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";

function UpdateAddress() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState();
    const [data, setData] = useState({
        id: "",
        jwt: "",
        line1: "",
        line2: "",
        city: "",
        pincode: "",
        state: ""
    });

    const changeHandler = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const refreshPage = () => {
        window.location.reload();
    };

    useEffect(() => {
        const ven = JSON.parse(sessionStorage.getItem("vendor"));
        const cust = JSON.parse(sessionStorage.getItem("customer"));

        if (ven) {
            setUserRole("ven");
            axios.get(`${IP_ADDRS}/vendors/${ven.id}/addresses`, {
                headers: { Authorization: `Bearer ${ven.jwt}` }
            }).then(res => {
                setData({ ...res.data, id: ven.id, jwt: ven.jwt });
            }).catch(err => {
                swal("Something went Wrong", `${err}`, "error");
            });
        } else if (cust) {
            setUserRole("cust");
            axios.get(`${IP_ADDRS}/customers/${cust.id}/addresses`, {
                headers: { Authorization: `Bearer ${cust.jwt}` }
            }).then(res => {
                setData({ ...res.data, id: cust.id, jwt: cust.jwt });
            }).catch(err => {
                swal("Something went Wrong", `${err}`, "error");
            });
        } else {
            swal("Relogin to Access this Page", "", "error");
            sessionStorage.clear();
            navigate("/sign-in");
        }
    }, []);

    const submitData = (e) => {
        e.preventDefault();
        const url = userRole === "ven"
            ? `${IP_ADDRS}/vendors/${data.id}/editaddress`
            : `${IP_ADDRS}/customers/${data.id}/editaddresses`;

        axios.put(url, data, {
            headers: { Authorization: `Bearer ${data.jwt}` }
        }).then(res => {
            swal(`${res.data}`, "", "success");
            navigate(userRole === "ven" ? "/vendor" : "/customer");
        }).catch(err => {
            swal(`${err.data}`, "", "error");
        });
    };

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow p-4 rounded">
                        <h2 className="text-center mb-4">Update Address</h2>
                        <form onSubmit={submitData}>
                            <div className="form-group mb-3">
                                <label><b>Line 1</b></label>
                                <input
                                    type="text"
                                    name="line1"
                                    className="form-control"
                                    value={data.line1}
                                    onChange={changeHandler}
                                    placeholder="Enter Line 1"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label><b>Line 2</b></label>
                                <input
                                    type="text"
                                    name="line2"
                                    className="form-control"
                                    value={data.line2}
                                    onChange={changeHandler}
                                    placeholder="Enter Line 2"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label><b>City</b></label>
                                <input
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    value={data.city}
                                    onChange={changeHandler}
                                    placeholder="Enter City"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label><b>Pincode</b></label>
                                <input
                                    type="text"
                                    name="pincode"
                                    className="form-control"
                                    value={data.pincode}
                                    onChange={changeHandler}
                                    placeholder="Enter Pincode"
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label><b>State</b></label>
                                <input
                                    type="text"
                                    name="state"
                                    className="form-control"
                                    value={data.state}
                                    onChange={changeHandler}
                                    placeholder="Enter State"
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary">Update</button>
                                <button type="button" className="btn btn-outline-secondary" onClick={refreshPage}>Reset</button>
                                <button type="button" className="btn btn-outline-danger" onClick={() =>
                                    navigate(userRole === "ven" ? "/vendor" : "/customer")
                                }>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateAddress;
