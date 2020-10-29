import React from "react";
import "./SettingsNavbar.css";
import { SettingsNavbarData } from "./SettingsNavbarData";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

function SettingsNavbar() {
  return (
    <div className="wrapper">
      <div className="navbar">
        <Typography
          className="petlog-title"
          component="h1"
          align="center"
          variant="h4"
        >
          Settings
        </Typography>
        <ul className="navbar-list">
          {SettingsNavbarData.map((val, key) => {
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

export default SettingsNavbar;
