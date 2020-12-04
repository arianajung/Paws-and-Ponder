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

import Auth from "./actions/Auth/Auth";


class App extends React.Component {
  constructor(props) {
    super(props);
    Auth.checkSession(this); // sees if a user is logged in.
  }

  state = {
    currentUser: null, // added for session
  };

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact path={["/", "/login", "/main"] /* any of these URLs are accepted. */}
              render={props => (
                !currentUser ? <Login {...props} app={this} /> : <Main {...props} app={this} />
              )}
            />

            <Route
              exact path="/signup"
              render={() =>
                !currentUser ? (
                  <SignUp app={this} />             
                ) : (
                  <Redirect to="/main" />
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
            { /* 404 if URL isn't expected. */}
            <Route render={() => <div>404 Not found, the URL requested is invalid.</div>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
