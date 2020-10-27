/* Methods that modify the Login component state */

// add a new user to the users list
export const addUser = (login) => {
  const userList = login.state.users;
  const user = {
    username: login.state.username,
    password: login.state.password,
  };
  userList.push(user);
  login.setState({ users: userList });

  console.log(login.state.users); // log out updated state
};
