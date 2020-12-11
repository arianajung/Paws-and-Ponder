import React from "react";
import ProfileSettings from "../subSettings/ProfileSettings";
import CustomizationSettings from "../subSettings/CustomizationSettings";
import NotificationSettings from "../subSettings/NotificationSettings";

import { getCurrentUser } from "../../actions/user";

import Navbar from "../Navbar/Navbar";

import "./Settings.css";

class Settings extends React.Component {
	/* TODO: 
	  Initialize this state with current userdata for setting up various settings' initial value
	  */
	constructor(props) {
		super(props);
		// Obtain information about current user
		// const { current_username, users } = props.app.state;
		// const [current_user_index, current_user] = getCurrentUserAndIndex(
		//   users,
		//   current_username
		// );

		// this.state = {
		//   app_users: props.app.state.users,
		//   curr_account: current_username,
		//   current_user_index: current_user_index,
		//   current_username: current_user.username,
		//   current_user_role: current_user.role,
		//   profileImg: current_user.profileImg,
		//   total_num_posts: props.app.state.total_num_posts,
		//   following: current_user.following,
		//   followers: current_user.followers,
		// };
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
					<ProfileSettings
						// curr_account={this.state.curr_account}
						// app_users={this.state.app_users}
						// current_user_index={this.state.current_user_index}
						// name={this.state.current_username}
						// profileImg={this.state.profileImg}
		  				currentUserInfo={this.state.currentUser}

					/>
					{/* Consider Removing the settings below */}
					{/* <CustomizationSettings />
					<NotificationSettings /> */}
				</div>
			</div>
		);
	}
}

export default Settings;
