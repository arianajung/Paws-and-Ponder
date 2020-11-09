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
import { Link } from "react-router-dom";
import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";

function handle(app, username, profile) {
  app.setState({
    profile_username: username,
  });

  const { users } = app.state;

  const [profile_user_index, profile_user] = getCurrentUserAndIndex(
    users,
    username
  )

  profile.setState({
    profile_user_index: profile_user_index,
    profile_username: profile_user.username,
    profile_user_role: profile_user.role,
    profile_profileImg: profile_user.profileImg,
    posts: profile_user.userPosts,
    all_posts: profile_user.userPosts
  })
};

export default function PermanentDrawerRight(props) {
  // retreive style sheet for Drawer
  const classes = useStyles();

  const { app, profile, following, followers } = props;

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
        <Typography className="title" variant="h6">
          Followers
        </Typography>
        <List>
          {/* Generate list for  */}
          {followers.map((username) => (
            <Link key={username} to={"/profile"}>
              <ListItem button key={username} onClick={() => handle(app, username, profile)}>
                <ListItemAvatar>
                  <Avatar alt={username} src={getCurrentUserAndIndex(app.state.users, username)[1].profileImg} />
                </ListItemAvatar>
                <ListItemText primary={username} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <Typography className="title" variant="h6">
          Following
        </Typography>
        <List>
          {following.map((username) => (
            <Link key={username} to={"/profile"}>
              <ListItem button key={username} onClick={() => handle(app, username, profile)}>
                <ListItemAvatar>
                  <Avatar alt={username} src={getCurrentUserAndIndex(app.state.users, username)[1].profileImg} />
                </ListItemAvatar>
                <ListItemText primary={username} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div >
  );
}
