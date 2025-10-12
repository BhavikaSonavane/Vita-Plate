import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";

function AddAddress() {
  const [userRole, setUserRole] = useState();
  const [id, setId] = useState();
  const [firstName, setFirstName] = useState("");

  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    pincode: "",
    state: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("signUpData"));
    if (data) {
      setFirstName(data.firstName);
      setId(data.id);
      setUserRole(data.userRole === "ROLE_VENDOR" ? "vendors" : "customers");
    }
  }, []);

  const handleChange = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { line1, line2, city, pincode, state } = address;

    if (!line1 || !line2 || !city || !pincode || !state) {
      setError(true);
      return;
    }

    setSubmitted(true);
    setError(false);

    axios
      .post(`${IP_ADDRS}/${userRole}/${id}/addaddress`, address)
      .then((response) => {
        setAddress({
          line1: "",
          line2: "",
          city: "",
          pincode: "",
          state: "",
        });
        swal(`${response.data}`, "", "success");
        sessionStorage.removeItem("signUpData");
        navigate("/sign-in");
      })
      .catch((error) => {
        console.error(error);
        swal("Something Went Wrong", "", "error");
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg col-md-6 offset-md-3">
        <div className="card-body p-4">
          <h5 className="mb-3">Hi {firstName},</h5>
          <h3 className="text-center mb-4">Add Address</h3>

          {error && (
            <div className="alert alert-danger" role="alert">
              Please fill in all the fields.
            </div>
          )}

          {submitted && !error && (
            <div className="alert alert-success" role="alert">
              Address submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Address Line 1</label>
              <input
                type="text"
                name="line1"
                value={address.line1}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Line 1"
              />
            </div>

            <div className="form-group mb-3">
              <label>Address Line 2</label>
              <input
                type="text"
                name="line2"
                value={address.line2}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Line 2"
              />
            </div>

            <div className="form-group mb-3">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter City"
              />
            </div>

            <div className="form-group mb-3">
              <label>Pincode</label>
              <input
                type="number"
                name="pincode"
                value={address.pincode}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter 6-digit Pincode"
                maxLength="6"
              />
            </div>

            <div className="form-group mb-4">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter State"
              />
            </div>

            <div className="text-center">
              <button className="btn btn-primary w-50" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
