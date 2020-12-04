import React from "react";
import { withRouter } from "react-router-dom";
import SignUpForm from "../SignUpForm/SignUpForm";
import Auth from "../../actions/Auth/Auth";

class SignUp extends React.Component {
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
                <SignUpForm
                    username={this.state.username}
                    password={this.state.password}
                    handleChange={this.handleChange}
                    auth={() => {
                        Auth.signupBackEnd(this, this.props.app);
                    }}
                />
            </div>
        );
    }
}

export default withRouter(SignUp);
