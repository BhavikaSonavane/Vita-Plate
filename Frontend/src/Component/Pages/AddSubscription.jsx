import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { IP_ADDRS } from "../../Service/Constant";
import { useEffect } from 'react';

function AddSubscription() {

  var vendorobj = JSON.parse(sessionStorage.getItem("vendor"));

  useEffect(() => {
    vendorobj = JSON.parse(sessionStorage.getItem("vendor"));
    if (vendorobj == null)
      swal("Not Authorized", "", "error");
  }, [])

  const navigate = useNavigate();

  const [sunImageFile, setSunImageFile] = useState();
  const [monImageFile, setMonImageFile] = useState();
  const [tueImageFile, setTueImageFile] = useState();
  const [wedImageFile, setWedImageFile] = useState();
  const [thuImageFile, setThuImageFile] = useState();
  const [friImageFile, setFriImageFile] = useState();
  const [satImageFile, setSatImageFile] = useState();
  const [subPlanImage, setSubPlanImage] = useState();


  const [subsobj, setsubsobj] = useState({
    name: "",
    description: "",
    price: "",
    planType: "",
  })

  const [sundayLunch, setSundayLunch] = useState({
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "SUNDAY_LUNCH"
  })

  const [mondayLunch, setMondayLunch] = useState({
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "MONDAY_LUNCH"
  })

  const [tuesdayLunch, setTuesdayLunch] = useState({
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "TUESDAY_LUNCH"
  })

  const [wednesdayLunch, setWednesdayLunch] = useState({
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "WEDNESDAY_LUNCH"
  })

  const [thursdayLunch, setThursdayLunch] = useState({
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "THURSDAY_LUNCH"
  })

  const [fridayLunch, setFridayLunch] = useState({
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "FRIDAY_LUNCH"
  })

  const [saturdayLunch, setSaturdayLunch] = useState({
    name: "",
    description: "",
    price: "",
    foodType: "",
    day: "SATURDAY_LUNCH"
  })

  const handleChange = (event) => {
    setsubsobj({
      ...subsobj,
      [event.target.name]: event.target.value,
    });
  };

  const sunHandleChange = (event) => {
    setSundayLunch({
      ...sundayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const monHandleChange = (event) => {
    setMondayLunch({
      ...mondayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const tueHandleChange = (event) => {
    setTuesdayLunch({
      ...tuesdayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const wedHandleChange = (event) => {
    setWednesdayLunch({
      ...wednesdayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const thurHandleChange = (event) => {
    setThursdayLunch({
      ...thursdayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const friHandleChange = (event) => {
    setFridayLunch({
      ...fridayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const satHandleChange = (event) => {
    setSaturdayLunch({
      ...saturdayLunch,
      [event.target.name]: event.target.value,
    });
  };

  const foodtypes = ["VEG", "NONVEG"];

  const options = ['WEEKLY', 'MONTHLY'];

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (subsobj.name === '' || subsobj.description === '' || subsobj.price === '' || subsobj.planType === '' ||
      sundayLunch.description === '' || sundayLunch.price === '' || sundayLunch.foodType === '' || sundayLunch.name === '' ||
      mondayLunch.description === '' || mondayLunch.price === '' || mondayLunch.foodType === '' || mondayLunch.name === '' ||
      tuesdayLunch.description === '' || tuesdayLunch.price === '' || tuesdayLunch.foodType === '' || tuesdayLunch.name === '' ||
      wednesdayLunch.description === '' || wednesdayLunch.price === '' || wednesdayLunch.foodType === '' || wednesdayLunch.name === '' ||
      thursdayLunch.description === '' || thursdayLunch.price === '' || thursdayLunch.foodType === '' || thursdayLunch.name === '' ||
      fridayLunch.description === '' || fridayLunch.price === '' || fridayLunch.foodType === '' || fridayLunch.name === '' ||
      saturdayLunch.description === '' || saturdayLunch.price === '' || saturdayLunch.foodType === '' || saturdayLunch.name === ''
    ) {
      swal("Please Enter All Fields", "", "error")
      return;
    }

    else {
      let spId
      axios.post(`${IP_ADDRS}/subscription/newplan/${vendorobj.id}`, subsobj)
        .then(res => {
          //Vendor Added
          spId = res.data.id;
          //add subscription plan image
          {
            if (subPlanImage != null) {
              const form = new FormData();
              form.append("subPlanImage", subPlanImage);
              const options = {
                method: 'POST',
                url: `${IP_ADDRS}/subscription/${spId}/subPlanImage`,
                headers: {
                  Authorization: ``,
                  'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                },
                data: form
              };

              axios.request(options).then(response => {
                console.log(response.data)
              }).catch(error => {
                console.log(error);
              });
            }
          }
          // sundaylunch
          axios.post(`${IP_ADDRS}/tiffins/addTiffin/${spId}`, sundayLunch)
            .then(resp => {
              console.log(resp.data.id)
              if (sunImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", sunImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${resp.data.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          // Mondaylunch
          axios.post(`${IP_ADDRS}/tiffins/addTiffin/${spId}`, mondayLunch)
            .then(resp => {
              console.log(resp.data.id)
              if (monImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", monImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${resp.data.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          // tuesdaylunch
          axios.post(`${IP_ADDRS}/tiffins/addTiffin/${spId}`, tuesdayLunch)
            .then(resp => {
              console.log(resp.data.id)
              if (tueImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", tueImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${resp.data.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          // Wednesday lunch
          axios.post(`${IP_ADDRS}/tiffins/addTiffin/${spId}`, wednesdayLunch)
            .then(resp => {
              console.log(resp.data.id)
              if (wedImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", wedImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${resp.data.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          // Thursday lunch
          axios.post(`${IP_ADDRS}/tiffins/addTiffin/${spId}`, thursdayLunch)
            .then(resp => {
              console.log(resp.data.id)
              if (thuImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", thuImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${resp.data.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          // fridaylunch
          axios.post(`${IP_ADDRS}/tiffins/addTiffin/${spId}`, fridayLunch)
            .then(resp => {
              console.log(resp.data.id)
              if (friImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", friImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${resp.data.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          // Saturday lunch
          axios.post(`${IP_ADDRS}/tiffins/addTiffin/${spId}`, saturdayLunch)
            .then(resp => {
              console.log(resp.data.id)
              if (satImageFile != null) {
                let form = new FormData();
                form.append("tiffinImage", satImageFile);
                const options = {
                  method: 'POST',
                  url: `${IP_ADDRS}/tiffins/${resp.data.id}/tiffinImage`,
                  headers: {
                    Authorization: ``,
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                  },
                  data: form
                };
                axios.request(options).then(response => {
                  console.log(response.data)
                }).catch(error => {
                  console.log(error);
                });
              }
            })
            .catch(err => {
              console.log(err)
            });

          swal("Subscription Plan Added Successfully", "", "success")
          setsubsobj({ ...subsobj, name: '', description: '', price: '', planType: '' })
          setSundayLunch({ ...sundayLunch, name: '', description: '', price: '', foodType: '' })
          setMondayLunch({ ...mondayLunch, name: '', description: '', price: '', foodType: '' })
          setTuesdayLunch({ ...tuesdayLunch, name: '', description: '', price: '', foodType: '' })
          setWednesdayLunch({ ...wednesdayLunch, name: '', description: '', price: '', foodType: '' })
          setThursdayLunch({ ...thursdayLunch, name: '', description: '', price: '', foodType: '' })
          setFridayLunch({ ...fridayLunch, name: '', description: '', price: '', foodType: '' })
          setSaturdayLunch({ ...saturdayLunch, name: '', description: '', price: '', foodType: '' })
          setSunImageFile()
          setMonImageFile()
          setTueImageFile()
          setWedImageFile()
          setThuImageFile()
          setFriImageFile()
          setSatImageFile()
          setSubPlanImage()
          navigate("/vendor")

        })

        .catch(err => {
          console.log(err)
        })


    }


  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h4 className="text-center mb-4">
          👋 Hi {vendorobj.firstName}, Add a New Subscription Plan
        </h4>
  
        <form onSubmit={handleSubmit}>
          {/* Subscription Plan Section */}
          <div className="mb-4 border rounded p-3 bg-light">
            <h5 className="text-primary">📋 Plan Details</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Plan Name</label>
                <input
                  onChange={handleChange}
                  name="name"
                  value={subsobj.name}
                  type="text"
                  className="form-control"
                />
              </div>
  
              <div className="col-md-6 mb-3">
                <label className="form-label">Price (₹)</label>
                <input
                  onChange={handleChange}
                  name="price"
                  value={subsobj.price}
                  type="number"
                  className="form-control"
                />
              </div>
  
              <div className="col-md-12 mb-3">
                <label className="form-label">Description</label>
                <textarea
                  onChange={handleChange}
                  name="description"
                  value={subsobj.description}
                  className="form-control"
                  rows="2"
                />
              </div>
  
              <div className="col-md-6 mb-3">
                <label className="form-label">Plan Type</label>
                <select
                  onChange={handleChange}
                  name="planType"
                  className="form-select"
                >
                  <option>---select one---</option>
                  {options.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </select>
              </div>
  
              <div className="col-md-6 mb-3">
                <label className="form-label">Plan Image</label>
                <input
                  type="file"
                  accept=".png, .jpg,.jpeg"
                  className="form-control"
                  onChange={(e) => setSubPlanImage(e.target.files[0])}
                />
              </div>
            </div>
          </div>
  
          {/* Daily Tiffins Section */}
          <div className="border rounded p-3 bg-light">
            <h5 className="text-success">🍱 Daily Lunch Menu</h5>
            <p className="text-muted mb-3">Enter tiffin details for each day of the week:</p>
  
            <div className="table-responsive">
              <table className="table table-bordered align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Day</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Food Type</th>
                    <th>Price (₹)</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { day: "Sunday", data: sundayLunch, handler: sunHandleChange, imgSetter: setSunImageFile },
                    { day: "Monday", data: mondayLunch, handler: monHandleChange, imgSetter: setMonImageFile },
                    { day: "Tuesday", data: tuesdayLunch, handler: tueHandleChange, imgSetter: setTueImageFile },
                    { day: "Wednesday", data: wednesdayLunch, handler: wedHandleChange, imgSetter: setWedImageFile },
                    { day: "Thursday", data: thursdayLunch, handler: thurHandleChange, imgSetter: setThuImageFile },
                    { day: "Friday", data: fridayLunch, handler: friHandleChange, imgSetter: setFriImageFile },
                    { day: "Saturday", data: saturdayLunch, handler: satHandleChange, imgSetter: setSatImageFile }
                  ].map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.day}</td>
                      <td>
                        <input
                          onChange={item.handler}
                          name="name"
                          value={item.data.name}
                          type="text"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <textarea
                          onChange={item.handler}
                          name="description"
                          value={item.data.description}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <select
                          onChange={item.handler}
                          name="foodType"
                          className="form-select"
                          value={item.data.foodType}
                        >
                          <option value="">Select</option>
                          {foodtypes.map((ftype, i) => (
                            <option key={i} value={ftype}>{ftype}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          onChange={item.handler}
                          name="price"
                          value={item.data.price}
                          type="number"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="file"
                          accept=".png, .jpg,.jpeg"
                          className="form-control"
                          onChange={(e) => item.imgSetter(e.target.files[0])}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
  
          {/* Submit Button */}
          <div className="text-center mt-4">
            <button className="btn btn-primary px-5 py-2" type="submit">
              Submit Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}

export default AddSubscription;