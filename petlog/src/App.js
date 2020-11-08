import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";

import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Main from "./Main/Main";
import MyBlog from "./MyBlog/MyBlog";
import Bookmarks from "./Bookmarks/Bookmarks";
import Settings from "./Settings/Settings";
import profileImg from "./static/bunny.jpg";
import Auth from "./Auth/Auth";

class App extends React.Component {
  state = {
    current_username: "", // username of the currently logged in user
    users: [
      {
        username: "user",
        role: "user",
        profileImg: profileImg,
        following: ["Ovi", "Ariana", "Fred"],
        followers: ["Sherry", "Fred"],
        mainPosts: [
          {
            postID: 1,
            date: "29/10/2020",
            user: "Ariana",
            text:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
            comments: [],
            bookmarked: false,
            tags: [
              "Hard Coded Tags under App.js",
              "Tags can be added properly under My blog",
              "tag1", "tag2"
            ],
          },
          {
            postID: 2,
            date: "29/10/2020",
            user: "Sherry",
            text:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
            comments: [],
            bookmarked: false,
            tags: ["tag1"],
          },
          {
            postID: 3,
            date: "29/10/2020",
            user: "Fred",
            text:
              "Some text to enable scrolling. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.scelerisque quis lacus et, ultrices blandit neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
            comments: [],
            bookmarked: false,
            tags: ["tag1","tag3"],
          },
          {
            postID: 4,
            date: "29/10/2020",
            user: "Enable Scrolling",
            text:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
            comments: [],
            bookmarked: false,
            tags: ["tag2","tag3"],
          },
          {
            postID: 5,
            date: "29/10/2020",
            user: "Ariana",
            text: "hi",
            comments: [],
            bookmarked: false,
            tags: ["tag4"],
          },
        ],
        userPostCount: 1,
        userPosts: [
          {
            postID: 1,
            date: "30/10/2020",
            user: "user",
            text: "hi i like cats :D",
            image: "",
            comments: [
              {
                user: "Ariana",
                text:
                  "wow me too \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
              },
              {
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
      },
      {
        username: "admin",
        role: "admin",
        profileImg: "",
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
      { username: "admin", password: "admin" },
    ],
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Login app={this} />} />
            <Route exact path="/signup" render={() => <SignUp app={this} />} />
            <Route
              exact
              path="/main"
              render={() =>
                Auth.isAuthenticated() ? (
                  <Main app={this} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
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
