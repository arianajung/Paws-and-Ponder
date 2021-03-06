class Auth {
  constructor() {
    this.authenticated = false;
  }

  // Send a request to check if a user is logged in through the session cookie
  checkSession = (app) => {
    const url = "/users/check-session";

    fetch(url)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((json) => {
        if (json && json.currentUser) {
          app.setState({ currentUser: json.currentUser });
        }
      })
      .catch((error) => {
        console.log("Session check failed");
      });
  };

  loginBackEnd = (loginComp, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/users/login", {
      method: "post",
      body: JSON.stringify(loginComp.state),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    // Send the request with fetch()
    fetch(request)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((json) => {
        if (json.currentUser !== undefined) {
          app.setState({
            currentUser: json.currentUser,
            curr_uid: json.curr_uid, // also set this in app state
          });
          this.authenticated = true;
          console.log("Login successful");
        }
      })
      .catch((error) => {
        alert("Login Failed. Check your credentials and User Status");
      });
  };

  signupBackEnd(signup, app) {
    const request = new Request("/api/addUser", {
      method: "post",
      body: JSON.stringify(signup.state),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    // Send the request with fetch()
    fetch(request)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((json) => {
        if (json.currentUser !== undefined) {
          app.setState({ currentUser: json.currentUser });
          this.authenticated = true;
          console.log("Account successfully created");
          console.log(app.state.users);
          console.log(app.state.userCreds);
        }
      })
      .then(() => {
        console.log("Auto Login");
        this.loginBackEnd(signup, app);
      })
      .catch((error) => {
        console.log("Sign Up Failed, Invalid inputs");
      });
  }

  logout(app) {
    this.authenticated = false;
    const url = "/users/logout";

    fetch(url)
      .then((res) => {
        app.setState({
          currentUser: null,
        });
        console.log("You have been successfully logged out");
      })
      .catch((error) => {
        console.log("Failed to log out");
      });
  }
}

export default new Auth();
