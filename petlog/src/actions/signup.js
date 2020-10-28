/* Methods that modify the SignUp component state */


// add a new user to the users list
export const addUser = (signup, app) => {
  const userList = app.state.users;
  const user = {
    username: signup.state.username,
    password: signup.state.password,
  }

  let notFound = true
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].username === signup.state.username) {
      notFound = false
    }
  }

  if (notFound) {
    userList.push(user);
      app.setState({ users: userList });
  }

  console.log(app.state.users); // log out updated state
};
