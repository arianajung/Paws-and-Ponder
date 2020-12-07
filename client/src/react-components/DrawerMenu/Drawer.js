import React, { useState, useEffect } from "react";
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
import { handleProfileBtn } from "../../actions/profile";
import { getFollowers, getFollowing } from "../../actions/user";
import { uid } from "react-uid";

export default function PermanentDrawerRight(props) {
    // retreive style sheet for Drawer
    const classes = useStyles();

    const { app, page, update } = props;

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        getFollowers(setFollowers);
        getFollowing(setFollowing);
    }, [update]);

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
                    {followers.map((user) => (
                        <Link key={uid(user)} to={"/profile"}>
                            <ListItem
                                button
                                onClick={() =>
                                    handleProfileBtn(app, user, page)
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        alt={user.username}
                                        src={user.profileImg}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={user.username} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
                <Typography className="title" variant="h6">
                    Following
                </Typography>
                <List>
                    {following.map((user) => (
                        <Link key={uid(user)} to={"/profile"}>
                            <ListItem
                                button
                                onClick={() =>
                                    handleProfileBtn(app, user, page)
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        alt={user.username}
                                        src={user.profileImg}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={user.username} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
