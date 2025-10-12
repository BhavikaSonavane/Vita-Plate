import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";

function ChangePassword() {
    const [userRole, setUserRole] = useState();
    const [data, setData] = useState({
        currentpass: "",
        newpass: "",
        confirmpass: "",
        passerror: ""
    });
    const [passType, setPassType] = useState("password");
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const [login, setLogin] = useState({ email: "", token: "" });

    const handleShowPassword = () => {
        setIsChecked(!isChecked);
    }

    useEffect(() => {
        setPassType(isChecked ? "text" : "password");
    }, [isChecked]);

    useEffect(() => {
        let ven = JSON.parse(sessionStorage.getItem("vendor"));
        if (ven != null) {
            setLogin({ email: ven.email, token: ven.jwt });
            setUserRole("ven");
        } else {
            let cust = JSON.parse(sessionStorage.getItem("customer"));
            if (cust != null) {
                setLogin({ email: cust.email, token: cust.jwt });
                setUserRole("cust");
            } else {
                swal("Relogin to Access this Page", "", "error");
                sessionStorage.clear();
                navigate("/sign-in");
            }
        }
    }, [navigate]);

    const changeHandler = (e) => {
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }

    const submitData = (e) => {
        e.preventDefault();
        if (data.currentpass === data.newpass) {
            setData({ ...data, passerror: "Current password and new password must be different. Please enter a new password" });
        } else if (data.newpass === data.confirmpass) {
            if (data.newpass === "") {
                setData({ ...data, passerror: "New password cannot be null!" });
                return;
            }
            setData({ ...data, passerror: "" });
            let obj = { email: login.email, oldPassword: data.currentpass, newPassword: data.newpass };
            axios.post(`${IP_ADDRS}/auth/updatepassword`, obj).then(res => {
                if (userRole === "ven") {
                    navigate(`/vendor`);
                } else if (userRole === "cust") {
                    navigate(`/customer`);
                }
                swal(`${res.data}`, "", "success");
            }).catch(err => {
                console.log(err);
                swal("You Entered Wrong details", "", "error");
            });
        } else {
            setData({ ...data, passerror: "New password and confirm password should be the same." });
        }
    }

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Change Password</h2>
                            <form onSubmit={submitData}>
                                <div className="form-group mb-3">
                                    <label>Current Password:</label>
                                    <input
                                        type="password"
                                        placeholder="Current Password"
                                        name="currentpass"
                                        className="form-control"
                                        value={data.currentpass}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>New Password:</label>
                                    <input
                                        type={passType}
                                        placeholder="New Password"
                                        name="newpass"
                                        className="form-control"
                                        value={data.newpass}
                                        onChange={changeHandler}
                                    />
                                    <div className="form-check mt-2">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="show_new_password"
                                            checked={isChecked}
                                            onChange={handleShowPassword}
                                        />
                                        <label className="form-check-label" htmlFor="show_new_password">Show Password</label>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Confirm Password:</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="confirmpass"
                                        className="form-control"
                                        value={data.confirmpass}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-success">Change</button>
                                    <button type="button" className="btn btn-danger" onClick={() => {
                                        if (userRole === "ven") {
                                            navigate(`/vendor`);
                                        } else if (userRole === "cust") {
                                            navigate(`/customer`);
                                        }
                                    }}>Cancel</button>
                                </div>
                            </form>
                            <div className="text-danger mt-3">
                                {data.passerror}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
