import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4 mt-5 border-top">
      <div className="container text-center">
        <h5 className="mb-3 fw-bold">Contact Us</h5>
        <p className="mb-1">Email: <a href="mailto:support@vitaplate.in" className="text-decoration-none text-dark fw-semibold">support@vitaplate.in</a></p>
        <p className="mb-3">Phone: <span className="fw-semibold">+91-9876543210</span></p>

        <hr className="my-3" />

        <p className="text-muted small mb-0">
          &copy; {new Date().getFullYear()} VitaPlate. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
