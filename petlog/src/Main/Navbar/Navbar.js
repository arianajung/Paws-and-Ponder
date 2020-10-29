import React from "react";
import "./Navbar.css";
import { NavbarData } from "./NavbarData";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import PetsIcon from '@material-ui/icons/Pets';

function Navbar() {
  return (
    <div className="wrapper">
      <div className="navbar">
        <Typography
          className="petlog-title"
          component="h1"
          align="center"
          variant="h4"
        >
          Petlog <PetsIcon />
        </Typography>
        <ul className="navbar-list">
          {NavbarData.map((val, key) => {
            return (
              <Link to={val.link}>
                <li key={key} className="row">
                  <div id="icon">{val.icon}</div>{" "}
                  <div id="title">{val.title}</div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
