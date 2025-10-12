// import React, { useEffect } from "react";
// import { Nav, NavLink, NavMenu } from "./NavbarElement";
// import { useState } from "react";

// const Navbar = (props) => {
//   const [loggedIn, setLoggedIn] = useState();
//   const [cust, setCust] = useState();
//   const [ven, setVen] = useState();
//   const [adm, setAdm] = useState();

//   useEffect(() => {
//     setLoggedIn(props.signIn);
//     setCust(JSON.parse(sessionStorage.getItem("customer")));
//     setVen(JSON.parse(sessionStorage.getItem("vendor")));
//     setAdm(JSON.parse(sessionStorage.getItem("admin")));
//   }, [props.signIn]);

//   const logout = () => {
//     sessionStorage.clear();
//     props.signOut(false);
//   };

//   return (
//     <>
//       {loggedIn ? (
//         <Nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: "50px" }}>
//           <div className="container-fluid">
//             <div>
//               <NavMenu>
//                 <NavLink to="/">gharkadabba</NavLink>
//               </NavMenu>
//             </div>
//             <div align="right">
//               <NavMenu>
//                 {cust != null ? <NavLink to="/customer">{cust.firstName}</NavLink> : ven != null ? <NavLink to="/vendor">{ven.firstName}</NavLink> : adm != null ? <NavLink to="/admin">{adm.firstName}</NavLink> : ""}
//                 <NavLink onClick={logout} to="/">
//                   Logout
//                 </NavLink>
//               </NavMenu>
//             </div>
//           </div>
//         </Nav>
//       ) : (
//         <Nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: "50px" }}>
//           <div className="container-fluid">
//             <div>
//               <NavMenu>
//                 <NavLink to="/">gharkadabba</NavLink>
//               </NavMenu>
//             </div>
//             <div align="right">
//               <NavMenu>
//                 <NavLink to="/sign-in">Sign in</NavLink>
//                 <NavLink to="/sign-up">Sign Up</NavLink>
//               </NavMenu>
//             </div>
//           </div>
//         </Nav>
//       )}
//     </>
//   );
// };

// export default Navbar;

import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome } from "react-icons/fa"; // Example icon from react-icons

const Navbar = (props) => {
  const [loggedIn, setLoggedIn] = useState();
  const [cust, setCust] = useState();
  const [ven, setVen] = useState();
  const [adm, setAdm] = useState();

  useEffect(() => {
    setLoggedIn(props.signIn);
    setCust(JSON.parse(sessionStorage.getItem("customer")));
    setVen(JSON.parse(sessionStorage.getItem("vendor")));
    setAdm(JSON.parse(sessionStorage.getItem("admin")));
  }, [props.signIn]);

  const logout = () => {
    sessionStorage.clear();
    props.signOut(false);
  };

  return (
    <nav className="navbar navbar-expand-lg orange ">
      <div className="container-fluid">
        <NavLink
          className="navbar-brand d-flex align-items-center"
          to="/"
          style={{
            fontFamily: "'Reem Kufi', sans-serif",
            fontSize: "2rem",
            fontWeight: "600",
          }}
        >
          VitaPlate
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {loggedIn ? (
              <>
                {cust != null && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/customer">
                      <button className="btn btn-secondary">
                        {cust.firstName}
                      </button>
                    </NavLink>
                  </li>
                )}

                {ven != null && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/vendor">
                      <button className="btn btn-secondary">
                        {ven.firstName}
                      </button>
                    </NavLink>
                  </li>
                )}
                {adm != null && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin">
                      <button className="btn btn-secondary">
                        {adm.firstName}
                      </button>
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={logout} to="/">
                    <button className="btn btn-danger">Logout</button>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-in">
                    <button className="btn btn-success">Sign in</button>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-up">
                    <button className="btn btn-primary">Sign Up</button>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
