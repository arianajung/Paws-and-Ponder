import React from "react";
import "./Navbar.css";
import { NavbarData } from "./NavbarData";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import PetsIcon from "@material-ui/icons/Pets";
import Auth from "../../Auth/Auth"
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

function contains(current_user, following) {
  for (let i = 0; i < following.length; i++) {
    if (following[i] === current_user) {
      return true
    }
  }
  return false
}

function handleFollowBtn(current_user, following, profile) {
  if (contains(current_user, following)) {
    const filtered = following.filter((username) => {
      return username !== current_user
    })
    profile.setState({
      following: filtered
    })
  } else {
    following.push(current_user)
    profile.setState({
      following: following
    })
  }
}

function Navbar({ profile, following, view, current_user, current_user_role, profileImg }) {
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

  let followBtn;
  if (view === "profile") {
    followBtn = (
      <div className="followBtn">
        <IconButton
          onClick={() => handleFollowBtn(current_user, following, profile)}
        >
          {contains(current_user, following) ? <PersonAddDisabledIcon /> : <PersonAddIcon />}
        </IconButton>
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
        {followBtn}

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
