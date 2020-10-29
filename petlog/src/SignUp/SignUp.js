import React from "react";
import { withRouter } from 'react-router-dom';
import SignUpForm from "../SignUpForm/SignUpForm";
import { addUser } from "../actions/authentication";

class SignUp extends React.Component {
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
        <SignUpForm
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleChange}
          addUser={() => addUser(this, this.props.app, () => {this.props.history.push("/main")})}
        />
      </div>
    );
  }
}

export default withRouter(SignUp);
