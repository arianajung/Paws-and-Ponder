import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";

import Login from "./react-components/Login/Login";
import SignUp from "./react-components/SignUp/SignUp";
import Main from "./react-components/Main/Main";
import MyBlog from "./react-components/MyBlog/MyBlog";
import Bookmarks from "./react-components/Bookmarks/Bookmarks";
import Settings from "./react-components/Settings/Settings";
import Profile from "./react-components/Profile/Profile";
import profileImg from "./static/bunny.jpg";
import dogImg from "./static/dog.jpg";
import catImg from "./static/cat.jpg";
import defaultImg from "./static/img_1.jpg";
import adminProfileImg from "./static/admin.png";
import Auth from "./actions/Auth/Auth";

class App extends React.Component {
    constructor(props) {
        super(props);
        Auth.checkSession(this); // sees if a user is logged in.
    }
    // The following state contains user information and posts that are hard coded for the moment,
    // we plan to retrieve this data from our backend in phase 2.
    // We pass information in this state down to each View to display certain components,
    // currently the operations on these Views will update the states here, but later they will be changed
    // to sending update requests to our server.

    state = {
        currentUser: null, // added for session
        curr_uid: null, // ObjectID of the curr user
        current_username: "", // username of the currently logged in user
        profile_username: "",
        total_num_posts: 11, // number of posts currently hard-coded into our state
        users: [
            {
                username: "user",
                role: "user",
                profileImg: profileImg,
                following: [],
                followers: ["admin", "user2"],
                mainPosts: [
                    {
                        postID: 1,
                        date: "29/10/2020",
                        user: "Ariana",
                        text:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
                        commentCount: 1,
                        comments: [
                            {
                                commentID: 1,
                                user: "Ariana",
                                text:
                                    "wow me too \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
                            },
                        ],
                        tags: [
                            "Hard Coded Tags under App.js",
                            "Tags can be added properly under My blog",
                            "tag1",
                            "tag2",
                        ],
                    },
                    {
                        postID: 2,
                        date: "29/10/2020",
                        user: "Sherry",
                        text:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
                        commentCount: 0,
                        comments: [],
                        tags: ["tag1"],
                    },
                    {
                        postID: 3,
                        date: "29/10/2020",
                        user: "Fred",
                        text:
                            "Some text to enable scrolling. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.scelerisque quis lacus et, ultrices blandit neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
                        commentCount: 0,
                        comments: [
                            {
                                commentID: 1,
                                user: "Ovidiu",
                                text: "wow me too.",
                            },
                        ],
                        tags: ["tag1", "tag3"],
                    },
                    {
                        postID: 4,
                        date: "29/10/2020",
                        user: "Ovidiu",
                        text:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
                        commentCount: 0,
                        comments: [],
                        tags: ["tag2", "tag3"],
                    },
                    {
                        postID: 5,
                        date: "29/10/2020",
                        user: "user2",
                        text: "hi",
                        commentCount: 0,
                        comments: [],
                        tags: ["tag4"],
                    },
                ],
                userPosts: [
                    {
                        postID: 6,
                        date: "30/10/2020",
                        user: "user",
                        text: "hi i like cats :D",
                        image: "",
                        commentCount: 2,
                        comments: [
                            {
                                commentID: 1,
                                user: "Ariana",
                                text:
                                    "wow me too \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
                            },
                            {
                                commentID: 2,
                                user: "Fred",
                                text: "bunnies are better",
                            },
                        ],
                        tags: [
                            "Enter in the sub text field and press button to add tags",
                            "checks for duplicates and empty tags",
                        ],
                    },
                ],
                bookmarks: [],
            },
            {
                username: "admin",
                role: "admin",
                profileImg: adminProfileImg,
                following: ["user"],
                followers: [],
                mainPosts: [
                    {
                        postID: 7,
                        date: "29/10/2020",
                        user: "Ariana",
                        text:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
                        commentCount: 1,
                        comments: [
                            {
                                commentID: 1,
                                user: "Ariana",
                                text:
                                    "wow me too \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
                            },
                        ],
                        tags: [
                            "Hard Coded Tags under App.js",
                            "Tags can be added properly under My blog",
                            "tag1",
                            "tag2",
                        ],
                    },
                ],
                userPosts: [
                    {
                        postID: 8,
                        date: "30/10/2020",
                        user: "admin",
                        text: "Cats are cute :D",
                        image: "",
                        commentCount: 2,
                        comments: [
                            {
                                commentID: 1,
                                user: "Ariana",
                                text:
                                    "wow me too \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
                            },
                            {
                                commentID: 2,
                                user: "Fred",
                                text: "bunnies are better",
                            },
                        ],
                        tags: ["tag1", "tag2"],
                    },
                    {
                        postID: 9,
                        date: "30/10/2020",
                        user: "admin",
                        text:
                            "More posts to make searching for tags more interesting :D",
                        image: "",
                        commentCount: 0,
                        comments: [],
                        tags: ["tag1", "tag3"],
                    },
                ],
                bookmarks: [],
            },
            {
                username: "user2",
                role: "user",
                profileImg: profileImg,
                following: ["user"],
                followers: [],
                mainPosts: [
                    {
                        postID: 10,
                        date: "29/10/2020",
                        user: "Ariana",
                        text:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
                        commentCount: 1,
                        comments: [
                            {
                                commentID: 1,
                                user: "Ovidiu",
                                text:
                                    "wow me too \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
                            },
                        ],
                        tags: [
                            "Hard Coded Tags under App.js",
                            "Tags can be added properly under My blog",
                        ],
                    },
                ],
                userPosts: [
                    {
                        postID: 11,
                        date: "30/10/2020",
                        user: "user2",
                        text: "Dogs are cute :D",
                        image: "",
                        commentCount: 1,
                        comments: [
                            {
                                commentID: 1,
                                user: "Sherry",
                                text: "wow me too.",
                            },
                        ],
                        tags: [
                            "Enter in the sub text field and press button to add tags",
                            "Tag5",
                        ],
                    },
                ],
                bookmarks: [],
            },
            {
                username: "Ariana",
                role: "user",
                profileImg: defaultImg,
                following: [],
                followers: [],
                mainPosts: [],
                userPostCount: 0,
                userPosts: [],
                bookmarks: [],
            },
            {
                username: "Sherry",
                role: "user",
                profileImg: defaultImg,
                following: [],
                followers: [],
                mainPosts: [],
                userPostCount: 0,
                userPosts: [],
                bookmarks: [],
            },
            {
                username: "Fred",
                role: "user",
                profileImg: catImg,
                following: [],
                followers: [],
                mainPosts: [],
                userPostCount: 0,
                userPosts: [],
                bookmarks: [],
            },
            {
                username: "Ovidiu",
                role: "user",
                profileImg: dogImg,
                following: [],
                followers: [],
                mainPosts: [],
                userPostCount: 0,
                userPosts: [],
                bookmarks: [],
            },
        ],
        userCreds: [
            { username: "user", password: "user" },
            { username: "user2", password: "user2" },
            { username: "admin", password: "admin" },
        ],
    };

    incrementTotalNumPosts = () => {
        this.setState({ total_num_posts: this.state.total_num_posts + 1 });
    };

    render() {
        const { currentUser } = this.state;

        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route
                            exact
                            path={
                                [
                                    "/",
                                    "/login",
                                    "/main",
                                ] /* any of these URLs are accepted. */
                            }
                            render={(props) =>
                                !currentUser ? (
                                    <Login {...props} app={this} />
                                ) : (
                                    <Main {...props} app={this} />
                                )
                            }
                        />
                        {/* <Route
              exact
              path="/"
              render={(props) =>
                currentUser ? (
                  <Redirect to="/main" />
                ) : (
                    <Login {...props} app={this} />
                  )
              }
            /> */}
                        <Route
                            exact
                            path="/signup"
                            render={() =>
                                Auth.isAuthenticated() ? (
                                    <Redirect to="/main" />
                                ) : (
                                    <SignUp app={this} />
                                )
                            }
                        />
                        {/* <Route
              exact
              path="/main"
              render={(props) =>
                currentUser ? (
                  <Main {...props} app={this} />
                ) : (
                    <Redirect to="/" />
                  )
              }
            /> */}
                        <Route
                            exact
                            path="/blog"
                            render={() =>
                                Auth.isAuthenticated() ? (
                                    <MyBlog app={this} />
                                ) : (
                                    <Redirect to="/" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/settings"
                            render={() =>
                                Auth.isAuthenticated() ? (
                                    <Settings app={this} />
                                ) : (
                                    <Redirect to="/" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/bookmarks"
                            render={() =>
                                Auth.isAuthenticated() ? (
                                    <Bookmarks app={this} />
                                ) : (
                                    <Redirect to="/" />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/profile"
                            render={() =>
                                Auth.isAuthenticated() ? (
                                    <Profile app={this} />
                                ) : (
                                    <Redirect to="/" />
                                )
                            }
                        />
                        {/* 404 if URL isn't expected. */}
                        <Route
                            render={() => (
                                <div>
                                    404 Not found, the URL requested is invalid.
                                </div>
                            )}
                        />
                        {/* <Route exact path="/main" render={() => <Main app={this} />} />
            <Route exact path="/blog" render={() => <MyBlog app={this} />} /> */}
                        {/* <Route
              exact
              path="/bookmarks"
              render={() => <Bookmarks app={this} />}
            /> */}
                        {/* <Route
              exact
              path="/settings"
              render={() => <Settings app={this} />}
            /> */}
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
