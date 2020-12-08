import profileImg from "../../static/bunny.jpg";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  // Send a request to check if a user is logged in through the session cookie
  checkSession = (app) => {
    const url = "/users/check-session";

    fetch(url)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(json => {
        if (json && json.currentUser) {
          app.setState({ currentUser: json.currentUser });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  loginBackEnd = (loginComp, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/users/login", {
      method: "post",
      body: JSON.stringify(loginComp.state),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });

    // Send the request with fetch()
    fetch(request)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(json => {
        if (json.currentUser !== undefined) {
          app.setState({
            currentUser: json.currentUser,
            curr_uid: json.curr_uid // also set this in app state
          });
          this.authenticated = true;
          console.log("Login successful");
        }
      })
      .catch(error => {
        console.log(error);
        alert("Login Failed. Check your credentials and User Status");
      });
  };

  signupBackEnd(signup, app) {
    const request = new Request("/api/addUser", {
      method: "post",
      body: JSON.stringify(signup.state),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });

    // Send the request with fetch()
    fetch(request)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(json => {
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
      .catch(error => {
        console.log(error);
        console.log("Sign Up Failed, Invalid inputs");
      });
  }

  logout(app) {
    this.authenticated = false;
    const url = "/users/logout";

    fetch(url)
      .then(res => {
        app.setState({
          currentUser: null,
        });
        console.log("You have been successfully logged out");
      })
      .catch(error => {
        console.log(error);
      });
  }

  addUser = (signup, app) => {
    const usersList = app.state.users;
    const userCredsList = app.state.userCreds;
    const username = signup.state.username;
    const password = signup.state.password;
    const user = {
      username: username,
      role: "user",
      profileImg: profileImg,
      following: [],
      followers: [],
      mainPosts: [],
      userPosts: [],
      bookmarks: [],
    };
    const userCred = {
      username: username,
      password: password,
    };

    if (username !== "" && password !== "") {
      let notFound = true;
      for (let i = 0; i < userCredsList.length; i++) {
        if (userCredsList[i].username === username) {
          notFound = false;
        }
      }

      if (notFound) {
        userCredsList.push(userCred);
        app.setState({ userCreds: userCredsList });
        usersList.push(user);
        app.setState({ users: usersList });
        return true;
      }
      return false;
    }
  };

  checkCred = (login, app) => {
    const userList = app.state.userCreds;
    const username = login.state.username;
    const password = login.state.password;

    for (let i = 0; i < userList.length; i++) {
      if (
        userList[i].username === username &&
        userList[i].password === password
      ) {
        return true;
      }
    }
    return false;
  };
}

export default new Auth();
