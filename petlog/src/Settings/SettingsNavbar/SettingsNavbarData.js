import React from "react";
import MainIcon from "@material-ui/icons/Home";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BuildIcon from '@material-ui/icons/Build';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from "@material-ui/icons/Settings";

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
    icon: <NotificationsIcon />,
    link: "/settings",
  }
  //whether or not a new view is created for profile/customization/notifications is debatable
];
