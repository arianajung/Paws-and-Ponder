import React from "react";

// material-ui imports
import SearchBar from "material-ui-search-bar";

// component imports
import PermanentDrawerRight from "../DrawerMenu/Drawer";
import Navbar from "../Navbar/Navbar";
import PostList from "../PostList/PostList";
import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";
import getPostIndex from "../../actions/getPostIndex";
import searchRequest from "../../actions/searchRequest"

// css
import "../MyBlog/MyBlog.css";

import { getCurrentUser } from "../../actions/user"

class Profile extends React.Component {
    constructor(props) {
        super(props);
        // this.props.history.push("/profile");
        // this.addComment = this.addComment.bind(this);

        // // Obtain information about current user
        // const { current_username, profile_username, users } = this.props.app.state;

        // const current_user = getCurrentUserAndIndex(
        //     users,
        //     current_username
        // )[1];

        // const profile_user = getCurrentUserAndIndex(
        //     users,
        //     profile_username
        // )[1];

        this.state = {
            // app_users: props.app.state.users,
            // userCreds: props.app.state.userCreds,
            // current_username: current_user.username,
            // current_user_role: current_user.role,
            // profileImg: current_user.profileImg,
            searchText: "",
            profileUser: props.app.state.profileUser,
            currentUser: null,
            // posts: profile_user.userPosts,
            // profile_username: profile_user.username,
            // profile_user_role: profile_user.role,
            // profile_profileImg: profile_user.profileImg,
            // profile_followers: profile_user.followers,
            // //this is added for search purposes, need a way to know all posts that exist currently
            // //the post we had can be understood as "posts to be displayed" -- Fred
            // all_posts: profile_user.userPosts,
        };
    }

    // fetch post info from db and store in state
    componentDidMount() {
        console.log("Profile.js: componenetDidMount()");
        getCurrentUser(this)
    }

    // addComment(comment, postID) {
    //     const posts_copy = this.state.posts.slice();
    //     const postIndex = getPostIndex(this.state.posts, postID);

    //     const new_comment = {
    //         commentID: this.state.posts[postIndex].commentCount + 1,
    //         user: this.state.current_username,
    //         text: comment,
    //     };

    //     posts_copy[postIndex].comments = this.state.posts[
    //         postIndex
    //     ].comments.concat(new_comment);

    //     posts_copy[postIndex].commentCount++;

    //     this.setState({
    //         posts: posts_copy,
    //     });
    // }

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
                <div className="blog-middle-area">
                    <div className="search-bar">
                    <SearchBar
                            value={this.state.searchText}
                            placeholder="Search by Tags or Usernames"
                            onCancelSearch={() =>
                                this.setState({ searchText: "" })
                            }
                            onChange={(newValue) =>
                                this.setState({ searchText: newValue })
                            }
                            onRequestSearch={() => searchRequest(this)}
                        />
                    </div>
                    {/* map posts  */}
                    <div className="post-area">
                        <PostList
                            currentUser={this.state.profileUser.username}
                            curr_uid={this.state.profileUser._uid}
                            type="profile"
                            // profileUser={this.state.profileUser}
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
