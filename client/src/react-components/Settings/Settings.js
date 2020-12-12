import React from "react";
import ProfileSettings from "../subSettings/ProfileSettings";

import { getCurrentUser } from "../../actions/users";

import Navbar from "../Navbar/Navbar";

import "./Settings.css";

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: {},
        };
    }

    componentDidMount() {
        getCurrentUser(this);
    }

    render() {
        const { app } = this.props;
        console.log("curr user: ", this.state.currentUser);
        return (
            // use general navbar instead
            <div className="settings-container">
                <div>
                    <Navbar app={app} view="settings" />
                </div>
                <div className="subsettings-container">
                    <ProfileSettings currentUserInfo={this.state.currentUser} />
                </div>
            </div>
        );
    }
}

export default Settings;
