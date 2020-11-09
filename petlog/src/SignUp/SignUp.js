import React from "react";
import { withRouter } from 'react-router-dom';
import SignUpForm from "../SignUpForm/SignUpForm";
import Auth from "../Auth/Auth";

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
          auth={() =>
            Auth.signup(this, this.props.app, () => {
              this.props.history.push("/main");
              this.props.app.setState({ 
                current_username: this.state.username 
              });
          })}
        />
      </div>
    );
  }
}

export default withRouter(SignUp);
