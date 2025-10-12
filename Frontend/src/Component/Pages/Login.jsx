import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadCaptchaEnginge, validateCaptcha, LoadCanvasTemplate } from "react-simple-captcha";
import swal from "sweetalert";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import { IP_ADDRS } from "../../Service/Constant";

function Login(props) {
  const [data, setData] = useState({
    username: "",
    password: "",
    loginerror: "",
  });
  const [passType, setPassType] = useState("password");
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    loadCaptchaEnginge(6, "red", "black", "upper");
  }, []);

  const handleShowPassword = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      setPassType("text");
    } else {
      setPassType("password");
    }
  }, [isChecked]);

  const changeHandler = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const submitData = (e) => {
    e.preventDefault();
    if (data.username === "") {
      swal("Username cannot be null", "", "error");
      return;
    }
    if (data.password === "") {
      swal("Password cannot be null", "", "error");
      return;
    }

    let user_captcha = document.getElementById("user_captcha_input").value;

    if (validateCaptcha(user_captcha) === true) {
      const obj = { email: data.username, password: data.password };
      axios
        .post(`${IP_ADDRS}/auth/signin`, obj)
        .then((response) => {
          props.isLogged(true);
          if (response.data.role.includes("ROLE_CUSTOMER")) {
            sessionStorage.setItem("customer", JSON.stringify(response.data));
            navigate(`/customer`);
          } else if (response.data.role.includes("ROLE_VENDOR")) {
            sessionStorage.setItem("vendor", JSON.stringify(response.data));
            navigate(`/vendor`);
          } else if (response.data.role.includes("ROLE_ADMIN")) {
            sessionStorage.setItem("admin", JSON.stringify(response.data));
            navigate(`/admin`);
          }
        })
        .catch((err) => {
          swal("Wrong Details Entered", "Enter Correct Details again. Make sure you are registered before Login", "error");
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
            <h2 className="text-center"><b>Login</b></h2>
            <hr className="lead" />

            <form onSubmit={submitData}>
              <div className="form-group">
                <label>Email Id:</label>
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  name="username"
                  className="form-control"
                  value={data.username}
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type={passType}
                  placeholder="Password"
                  name="password"
                  className="form-control"
                  value={data.password}
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

              <div className="form-group mt-4">
                <LoadCanvasTemplate />
              </div>
              <div className="form-group">
                <label>Enter Captcha:</label>
                <input
                  type="text"
                  placeholder="Enter Captcha"
                  id="user_captcha_input"
                  name="user_captcha_input"
                  className="form-control"
                />
              </div>

              <div className="d-flex justify-content-around mt-4">
                <button className="btn btn-success" type="submit">Login</button>
                <button className="btn btn-danger" onClick={() => navigate("/")}>Cancel</button>
              </div>
            </form>
            
            <div className="text-center mt-3">
              <a href="/forgotpassword">Forgot password? Click here...</a>
              {data.loginerror && <p className="text-danger">{data.loginerror}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
