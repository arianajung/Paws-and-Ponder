import React from "react";

// component imports
import PermanentDrawerRight from "../DrawerMenu/Drawer";
import Navbar from "../Navbar/Navbar";
import PostList from "../PostList/PostList";

// css
import "../MyBlog/MyBlog.css";

import { getCurrentUser } from "../../actions/users";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
            profileUser: props.app.state.profileUser,
            currentUser: null,
        };
    }

    // fetch post info from db and store in state
    componentDidMount() {
        console.log("Profile.js: componenetDidMount()");
        getCurrentUser(this);
    }

    render() {
        const { app } = this.props;

        return (
            <div className="myblog-container">
                <div>
                    <Navbar
                        app={app}
                        view="profile"
                        profileUser={this.state.profileUser}
                        currentUser={this.state.currentUser}
                        profilePage={this}
                    />
                </div>
                <div className="profile-middle-area">
                    {/* map posts  */}
                    <div className="post-area">
                        <PostList
                            currentUser={this.state.profileUser.username}
                            curr_uid={this.state.profileUser._uid}
                            type="profile"
                            app={app}
                            page={this}
                        />
                    </div>
                </div>
                <div>
                    <PermanentDrawerRight
                        app={app}
                        page={this}
                        update={this.state.currentUser}
                    />
                </div>
            </div>
        );
    }
}

export default Profile;
