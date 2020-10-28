import React from "react";
import SignUpForm from "../SignUpForm";

import { addUser } from "../actions/login";

class SignUp extends React.Component {
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
        <SignUpForm
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleChange}
          addUser={() => addUser(this)}
        />
      </div>
    );
  }
}

export default SignUp;
