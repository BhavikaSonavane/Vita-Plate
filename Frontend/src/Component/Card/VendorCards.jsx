import React, { useEffect, useState } from "react";
import Card from "./CardUI";
import axios from "axios";
import swal from "sweetalert";
import { IP_ADDRS } from "../../Service/Constant";

const Cards = () => {
  const [vendorList, setVendorList] = useState([]);

  useEffect(() => {
    axios
      .get(`${IP_ADDRS}/vendors/allvendors`)
      .then((res) => {
        const uniqueVendors = res.data.filter(
          (v, index, self) => index === self.findIndex((t) => t.id === v.id)
        );
        setVendorList(uniqueVendors);
      })
      .catch((err) => {
        console.log(err);
        swal("Something went wrong", "", "error");
      });
  }, []);

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {vendorList.length === 0 ? (
        <div className="text-center w-100 py-5">
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        vendorList.map((v) => (
          <div className="col" key={v.id}>
            <Card
              imgsrc={`${IP_ADDRS}/vendors/${v.id}/profileImage`}
              name={v.firstName.charAt(0).toUpperCase() + v.firstName.slice(1)}
              resrc={"vendor"}
              id={v.id}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;
