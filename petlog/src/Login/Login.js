import React from "react";
import LoginForm from "./LoginForm";

import { addUser } from "../actions/login";

/* Main landing page: log in */
/* Stores the hard-coded user credentials (username and password) */
class Login extends React.Component {
  state = {
    username: "",
    password: "",
    users: [],
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <LoginForm
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleChange}
          addUser={() => addUser(this)}
        />
      </div>
    );
  }
}

export default Login;
