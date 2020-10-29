import React from "react";
import { withRouter } from 'react-router-dom';
import LoginForm from "../LoginForm/LoginForm";
import { checkCred } from "../actions/authentication";

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
          checkCred={() => checkCred(this, this.props.app, () => {this.props.history.push("/main")})}
        />
      </div>
    );
  }
}

export default withRouter(Login);
