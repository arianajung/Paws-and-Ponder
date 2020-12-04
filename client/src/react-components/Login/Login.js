import React from "react";
import { withRouter } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import Auth from "../../actions/Auth/Auth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  state = {
    username: "",
    password: "",
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
          auth={() =>
            Auth.loginBackEnd(this, this.props.app)
          }
        />
      </div>
    );
  }
}

export default withRouter(Login);
