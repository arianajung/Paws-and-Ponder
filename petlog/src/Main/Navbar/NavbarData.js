import React from "react";
import MainIcon from "@material-ui/icons/Home";
import MyBlogIcon from "@material-ui/icons/MenuBook";
import SettingsIcon from "@material-ui/icons/Settings";

export const NavbarData = [
  {
    title: "Main",
    icon: <MainIcon />,
    link: "/main",
  },
  {
    title: "My Blog",
    icon: <MyBlogIcon />,
    link: "/blog",
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    link: "/settings",
  },
];
