import React from "react";
import { useStyles } from "./DrawerStyles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import "./Drawer.css";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
// Need to change this to import specific user image instead
import imgsrc from "../../static/img_1.jpg";

export default function PermanentDrawerRight(props) {
  // retreive style sheet for Drawer
  const classes = useStyles();

  const { following, followers } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <Typography className="title" variant="h6">
          Followers
        </Typography>
        <List>
          {/* Generate list for  */}
          {followers.map((text, index) => (
            <ListItem button key={text}>
              <ListItemAvatar>
                <Avatar alt={text} src={imgsrc} />
              </ListItemAvatar>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography className="title" variant="h6">
          Following
        </Typography>
        <List>
          {following.map((text, index) => (
            <ListItem button key={text}>
              <ListItemAvatar>
                <Avatar alt={text} src={imgsrc} />
              </ListItemAvatar>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
