import React from "react";
import "./Navbar.css";
import { NavbarData } from "./NavbarData";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import PetsIcon from "@material-ui/icons/Pets";
import Auth from "../../actions/Auth/Auth";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import { contains, handleFollowButton } from "../../actions/profile";

function Navbar({ app, view, profileUser, currentUser, profilePage }) {
    let userProfile;
    if ((view === "myblog" || view === "profile") && currentUser !== null) {
        userProfile = (
            <div className="profile-wrapper">
                <img
                    className="img"
                    src={
                        view === "myblog"
                            ? currentUser.profileImg
                            : view === "profile"
                            ? profileUser.profileImg
                            : null
                    }
                    alt="profile-pic"
                />
                <div className="profile-info">
                    <Typography
                        className="username"
                        component="h3"
                        align="center"
                        variant="h4"
                    >
                        {view === "myblog"
                            ? currentUser.username
                            : view === "profile"
                            ? profileUser.username
                            : null}
                    </Typography>
                    <Typography className="role" align="center" variant="h6">
                        {view === "myblog"
                            ? currentUser.role
                            : view === "profile"
                            ? profileUser.role
                            : null}
                    </Typography>
                    <Typography className="navbar-bio" align="center">
                        {view === "myblog"
                            ? currentUser.bio
                            : view === "profile"
                            ? profileUser.bio
                            : null}
                    </Typography>
                </div>
            </div>
        );
    }

    let followBtn;
    if (view === "profile" && currentUser !== null) {
        followBtn = (
            <div className="followBtn">
                <IconButton
                    onClick={() => handleFollowButton(profileUser, profilePage)}
                >
                    {contains(profileUser._id, currentUser.following) ? (
                        <PersonAddDisabledIcon />
                    ) : (
                        <PersonAddIcon />
                    )}
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
                    Paws & Ponder <PetsIcon />
                </Typography>

                {userProfile}
                {followBtn}

                <ul className="navbar-list">
                    {NavbarData.map((val, key) => {
                        return (
                            <Link
                                key={key}
                                to={val.link}
                                onClick={async () =>
                                    val.title === "Log Out"
                                        ? await Auth.logout(app)
                                        : ""
                                }
                            >
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
