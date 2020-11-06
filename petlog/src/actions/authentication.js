// add a new user to the users list
export const addUser = (signup, app, callback) => {
  const userList = app.state.users;
  const username = signup.state.username;
  const password = signup.state.password;
  const user = {
    username: username,
    password: password,
  };

  if (username !== "" && password !== "") {
    let notFound = true;
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].username === username) {
        notFound = false;
      }
    }

    if (notFound) {
      userList.push(user);
      app.setState({ users: userList });
      callback();
    }
  }

  console.log(app.state.users); // log out updated state
};

// check if the credentials are correct
export const checkCred = (login, app, callback) => {
  const userList = app.state.userCreds;
  const username = login.state.username;
  const password = login.state.password;

  let found = false;
  for (let i = 0; i < userList.length; i++) {
    if (
      userList[i].username === username &&
      userList[i].password === password
    ) {
      found = true;
      callback();
      console.log("login successful");
    }
  }

  if (!found) {
    console.log("login fail");
  }
};
