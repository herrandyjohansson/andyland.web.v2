import React from "react";

const DashboardNavbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active text-decoration-underline">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Kalender
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Cool stuff
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default DashboardNavbar;
