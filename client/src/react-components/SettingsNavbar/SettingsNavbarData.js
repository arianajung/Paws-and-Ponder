import React from "react";
import MainIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BuildIcon from "@material-ui/icons/Build";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";

export const SettingsNavbarData = [
    {
        title: "Main",
        icon: <MainIcon />,
        link: "/main", //brings back to user view
    },
    {
        title: "Profile",
        icon: <AccountCircleIcon />,
        link: "/settings", //set to settings for the moment
    },
    {
        title: "Customization",
        icon: <BuildIcon />,
        link: "/settings",
    },
    {
        title: "Notifications",
        icon: (
            <Badge badgeContent={1} color="primary">
                {" "}
                <NotificationsIcon />
            </Badge>
        ),
        link: "/settings",
    },
    {
        title: "Log Out",
        icon: <ExitToAppIcon />,
        link: "/",
    },
];
