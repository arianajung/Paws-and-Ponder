import React from "react";
import "./Navbar.css";
import { NavbarData } from "./NavbarData";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import PetsIcon from "@material-ui/icons/Pets";
import Auth from "../../Auth/Auth"

function Navbar({ view, current_user, current_user_role, profileImg }) {
  let userProfile;
  if (view === "myBlog" || view === "profile") {
    userProfile = (
      <div className="profile-wrapper">
        <img className="img" src={profileImg} alt="profile-pic" />
        <div className="profile-info">
          <Typography
            className="username"
            component="h3"
            align="center"
            variant="h4"
          >
            {current_user}
          </Typography>
          <Typography className="role" align="center" variant="h6">
            {current_user_role}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="navbar">
        <Typography
          className="petlog-title"
          component="h1"
          align="center"
          variant="h4"
        >
          PETLOG <PetsIcon />
        </Typography>

        {userProfile}

        <ul className="navbar-list">
          {NavbarData.map((val, key) => {
            return (
              <Link key={key} to={val.link} onClick={() => val.title === "Log Out" ? Auth.logout() : ""}>
                <li className="row">
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
