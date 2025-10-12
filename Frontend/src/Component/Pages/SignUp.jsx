import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";
import "bootstrap/dist/css/bootstrap.min.css";

function SignUp() {
  const navigate = useNavigate();
  const [obj, setObj] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    mobile: "",
    userRole: "",
  });

  const [validEmailFlag, setValidEmailFlag] = useState(false);
  const [otp, setOtp] = useState({
    sendOTPflag: false,
    num: "",
  });
  const options = ["ROLE_CUSTOMER", "ROLE_VENDOR"];

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setObj({
      ...obj,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validEmailFlag) {
      swal("Validate Email Id First", "", "error");
      return;
    }
    if (
      obj.firstName === "" ||
      obj.lastName === "" ||
      obj.email === "" ||
      obj.password === "" ||
      obj.mobile === "" ||
      obj.userRole === ""
    ) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);

      axios
        .post(`http://localhost:8080/auth/signup`, obj)
        .then((response) => {
          sessionStorage.setItem(
            "signUpData",
            JSON.stringify({
              userRole: obj.userRole,
              firstName: obj.firstName,
              id: response.data.id,
            })
          );
          setObj({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            mobile: "",
            userRole: "---select one role---",
          });
          navigate(`/AddAddress`);
        })
        .catch((error) => {
          console.log(error);
          swal("Something went Wrong", "", "error");
        });
    }
  };

  const sendOTP = () => {
    if (obj.email === "") {
      swal("Please Enter Email", "", "error");
      return;
    }
    let emailObj = { email: obj.email };
    axios
      .post(`${IP_ADDRS}/auth/validateEmail`, emailObj)
      .then((res) => {
        swal(res.data, "", "success");
        setOtp({ ...otp, sendOTPflag: true });
      })
      .catch((err) =>
        swal({
          title: "Email Id Already Registered",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
      );
  };

  const verifyOTP = () => {
    if (obj.email === "") {
      swal("Please Enter Email", "", "error");
      return;
    }
    if (otp.num === "") {
      swal("Please Enter OTP", "", "error");
      return;
    }
    let otpObj = { email: obj.email, otp: otp.num };
    axios
      .post(`${IP_ADDRS}/auth/verifyOtp`, otpObj)
      .then((res) => {
        swal(res.data, "", "success");
        setValidEmailFlag(true);
      })
      .catch((err) => swal(`${err}`, "", "error"));
  };

  return (
    <div className="container mt-5">
      <div className="card col-md-6 offset-md-3">
        <div className="card-body">
          <h2 className="text-center">
            <b>User Registration</b>
          </h2>
          <hr className="lead"></hr>

          {error && (
            <div className="alert alert-danger" role="alert">
              Please enter all the fields
            </div>
          )}

          {submitted && (
            <div className="alert alert-success" role="alert">
              User {obj.firstName} {obj.lastName} successfully registered!!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Firstname</label>
              <input
                onChange={handleChange}
                className="form-control"
                name="firstName"
                value={obj.firstName}
                type="text"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Lastname</label>
              <input
                onChange={handleChange}
                className="form-control"
                name="lastName"
                value={obj.lastName}
                type="text"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                onChange={handleChange}
                className="form-control"
                name="email"
                value={obj.email}
                type="email"
              />
              <br />
              {validEmailFlag ? (
                <span className="text-success">Email Validated</span>
              ) : otp.sendOTPflag ? (
                <div className="input-group">
                  <input
                    onChange={(e) => {
                      setOtp({ ...otp, num: e.target.value });
                    }}
                    className="form-control"
                    name="otp"
                    value={otp.num}
                    type="text"
                    placeholder="Enter OTP"
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      onClick={verifyOTP}
                      className="btn btn-outline-secondary"
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <span>Click on Send OTP to validate email</span>
                  <button
                    type="button"
                    onClick={sendOTP}
                    className="btn btn-outline-primary ml-2"
                  >
                    Send OTP
                  </button>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                onChange={handleChange}
                className="form-control"
                name="password"
                value={obj.password}
                type="password"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mobile</label>
              <input
                onChange={handleChange}
                className="form-control"
                name="mobile"
                value={obj.mobile}
                type="text"
                maxLength={10}
              />
            </div>

            <div className="form-group">
              <label className="form-label">I am</label>
              <select
                onChange={handleChange}
                name="userRole"
                className="form-control"
                value={obj.userRole}
              >
                <option>---select one role---</option>
                {options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary btn-block" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
