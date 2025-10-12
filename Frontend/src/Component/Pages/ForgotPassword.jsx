import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";
import { loadCaptchaEnginge, validateCaptcha, LoadCanvasTemplate } from "react-simple-captcha";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

function ForgotPassword() {
    const [data, setData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        userCaptcha: ""
    });

    const [otpFlag, setOtpFlag] = useState(false);
    const [waitOTP, setWaitOTP] = useState(false);
    const [sendOTPButton, setSendOTPButton] = useState(true);
    const [waitLockFlag, setWaitLockFlag] = useState(true);

    const [passType, setPassType] = useState("password");
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        loadCaptchaEnginge(6, 'red', 'black', 'upper');
    }, []);

    const handleShowPassword = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        setPassType(isChecked ? "text" : "password");
    }, [isChecked]);

    const changeHandler = (e) => {
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    };

    const navigate = useNavigate();

    const changeFlag = () => {
        setWaitLockFlag(false);
    };

    const updatePassword = (e) => {
        e.preventDefault();

        const obj = { "email": data.email, "otp": data.otp, "newPassword": data.newPassword };
        axios.post(`${IP_ADDRS}/auth/changeForgottenPassword`, obj)
            .then(res => {
                swal("Password Updated", "", "success");
                navigate(`/sign-in`);
            })
            .catch(err => {
                swal("Enter Correct Details", "", "error");
            });
    };

    const setTempFlag = () => {
        setWaitOTP(false);
    };

    const submitData = (e) => {
        e.preventDefault();
        setTempFlag();

        if (validateCaptcha(data.userCaptcha) === true) {
            changeFlag();
            if (data.email === '') {
                swal("Email Field Empty", "Enter Valid Email", "error");
                return;
            }
            const obj = { "email": data.email };
            axios.post(`${IP_ADDRS}/auth/forgotPassword`, obj)
                .then(res => {
                    swal("OTP sent to your Email", "If not received click on resend, make sure to enter correct details", "success");
                    setWaitOTP(true);
                })
                .catch(err => {
                    swal("Something Went Wrong, Retry Again", "Make sure you are entering correct email!", "error");
                    setWaitLockFlag(true);
                });
        } else {
            swal("Captcha Does Not Match!", "Enter Correct Captcha", "error");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="card col-md-6">
                    <div className="card-body">
                        <h2 className='text-center'><b>Forgot Password</b></h2>
                        <hr className="lead"></hr>

                        <form onSubmit={submitData}>
                            <div className="form-group">
                                <label>Enter your registered emailId:</label>
                                <input
                                    type="email"
                                    placeholder="Enter Email ID"
                                    name="email"
                                    className="form-control"
                                    value={data.email}
                                    onChange={changeHandler}
                                />
                            </div>

                            {waitOTP && (
                                <div>
                                    <div className="form-group">
                                        <label>Enter OTP:</label>
                                        <input
                                            type="number"
                                            placeholder="Enter OTP"
                                            name="otp"
                                            className="form-control"
                                            value={data.otp}
                                            onChange={changeHandler}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Enter New Password:</label>
                                        <input
                                            type={passType}
                                            placeholder="Enter New Password"
                                            name="newPassword"
                                            className="form-control"
                                            value={data.newPassword}
                                            onChange={changeHandler}
                                        />
                                        <div className="form-check mt-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={isChecked}
                                                onChange={handleShowPassword}
                                                id="show"
                                            />
                                            <label className="form-check-label" htmlFor="show">Show Password</label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {waitLockFlag && (
                                <div className="form-group mt-4">
                                    <LoadCanvasTemplate />
                                    <input
                                        type="text"
                                        placeholder="Enter Captcha"
                                        onChange={changeHandler}
                                        value={data.userCaptcha}
                                        id="user_captcha_input"
                                        name="userCaptcha"
                                        className="form-control"
                                    />
                                </div>
                            )}

                            <div className="d-flex justify-content-around mt-4">
                                {waitLockFlag ? (
                                    <>
                                        <button className="btn btn-success" type="submit">SEND OTP</button>
                                        <button className="btn btn-danger" onClick={() => navigate("/login")}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        {waitOTP && (
                                            <>
                                                <button className="btn btn-success" type="button" onClick={submitData}>RE-SEND OTP</button>
                                                <button className="btn btn-success" type="button" onClick={updatePassword}>Update Password</button>
                                            </>
                                        )}
                                        <button className="btn btn-danger" onClick={() => navigate("/login")}>Cancel</button>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
