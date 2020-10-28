import React from "react";
import LoginForm from "../LoginForm/LoginForm";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

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
        />
      </div>
    );
  }
}

export default Login;
