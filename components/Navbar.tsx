import React from "react";
import Image from "next/image";
import NavbarIcon from "../public/svg/aperture.svg";
import Link from "next/link";
import { Sling as Hamburger } from "hamburger-react";

const Navbar: React.FC = () => {
  const [isSideBarOpen, setSideBarOpen] = React.useState(false);

  const toggleSideBar = () => {
    setSideBarOpen(!isSideBarOpen);
  };

  return (
    <>
      {" "}
      <nav className="navbar andyland-100 text-dark">
        <div className="container-fluid">
          <div className="d-flex align-items-center pe-4">
            <Hamburger toggled={isSideBarOpen} toggle={setSideBarOpen} />
            <div className="text-uppercase ms-2">
              <div
                className={`d-none d-sm-block ${
                  !isSideBarOpen ? "menu-closed" : "menu-open"
                } `}
              >
                menu
              </div>
            </div>
          </div>
        </div>
      </nav>
      {
        <div id="left-navigation">
          <div
            className={`sidebar position-absolute shadow ${
              isSideBarOpen && "active"
            }`}
          >
            <div className="sidebar-header">
              <ul className="nav flex-column text-uppercase">
                <li className="nav-item">
                  <Link href="/weather">
                    <a onClick={() => toggleSideBar()}>väder</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/mat">
                    <a onClick={() => toggleSideBar()}>recept</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/oslo">
                    <a onClick={() => toggleSideBar()}>oslo</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/hike">
                    <a onClick={() => toggleSideBar()}>hike</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Navbar;
