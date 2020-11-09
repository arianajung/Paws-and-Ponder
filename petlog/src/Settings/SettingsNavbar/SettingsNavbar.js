import React from "react";
import "../../Main/Navbar/Navbar.css";
import { SettingsNavbarData } from "./SettingsNavbarData";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Auth from "../../Auth/Auth"

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
          {/* Print each element for settings navigation bar */}
          {SettingsNavbarData.map((val, key) => {
            return (
              <div key={key}>
                <Link to={val.link} onClick={() => val.title === "Log Out" ? Auth.logout() : ""}>
                  <li className="row">
                    <div id="icon">{val.icon}</div>{" "}
                    <div id="title">{val.title}</div>
                  </li>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SettingsNavbar;
