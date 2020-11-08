import profileImg from "../static/bunny.jpg";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(login, app, callback) {
    if (this.checkCred(login, app)) {
      this.authenticated = true;
      console.log("Login successful")
      callback();
    } else {
      console.log("Login fail")
    }
    
  }

  signup(signup, app, callback) {
    if (this.addUser(signup, app)) {
      this.authenticated = true;
      console.log("Account successfully created")
      console.log(app.state.users)
      console.log(app.state.userCreds)
      callback();
    } else {
      console.log("Invalid")
    }
  }

  logout() {
    this.authenticated = false;
    console.log("You have been successfully logged out")
  }

  isAuthenticated() {
    return this.authenticated;
  }

  addUser = (signup, app) => {
    const usersList = app.state.users;
    const userCredsList = app.state.userCreds;
    const username = signup.state.username;
    const password = signup.state.password
    const user = {
      username: username,
      role: "user",
      profileImg: profileImg,
      following: [],
      followers: [],
      mainPosts: [],
      userPostCount: 0,
      userPosts: [],
      bookmarks: [],
    }
    const userCred = {
      username: username,
      password: password
    }
  
    if (username !== "" && password !== "") {
      let notFound = true
      for (let i = 0; i < userCredsList.length; i++) {
        if (userCredsList[i].username === username) {
          notFound = false
        }
      }
  
      if (notFound) {
        userCredsList.push(userCred);
        app.setState({ userCreds: userCredsList });
        usersList.push(user);
        app.setState({ users: usersList });
        return true
      }
      return false
    }
  }

  checkCred = (login, app) => {
    const userList = app.state.userCreds;
    const username = login.state.username;
    const password = login.state.password
  
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].username === username && userList[i].password === password) {
        return true
      }
    }
    return false
  }
}

export default new Auth();