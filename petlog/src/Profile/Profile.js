import React, { Component } from "react";

// material-ui imports
import SearchBar from "material-ui-search-bar";

// component imports
import PermanentDrawerRight from "../Main/DrawerMenu/Drawer";
import Navbar from "../Main/Navbar/Navbar";
import PostList from "./../PostList/PostList";
import getCurrentUserAndIndex from "../actions/getCurrentUserAndIndex";
import getPostIndex from "../actions/getPostIndex";

// css
import "../MyBlog/MyBlog.css";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.addComment = this.addComment.bind(this);

        // Obtain information about current user
        const { current_username, profile_username, users } = this.props.app.state;

        const current_user = getCurrentUserAndIndex(
            users,
            current_username
        )[1];

        const profile_user = getCurrentUserAndIndex(
            users,
            profile_username
        )[1];

        this.state = {
            app_users: props.app.state.users,
            current_username: current_user.username,
            current_user_role: current_user.role,
            profileImg: current_user.profileImg,
            searchText: "",
            posts: profile_user.userPosts,
            following: current_user.following,
            followers: current_user.followers,
            profile_username: profile_user.username,
            profile_user_role: profile_user.role,
            profile_profileImg: profile_user.profileImg,
            //this is added for search purposes, need a way to know all posts that exist currently
            //the post we had can be understood as "posts to be displayed" -- Fred
            all_posts: current_user.userPosts,
        };
        // For searching purposes, display initial posts if searching with empty string
    }

    // fetch post info from db and store in state
    componentDidMount() {
        console.log("MyBlog.js: componenetDidMount()");
    }

    // Filter to only display posts that include the tags in the search bar
    searchRequest() {
        if (this.state.searchText !== "") {
            this.setState({
                posts: this.state.all_posts.filter((post) => {
                    return post.tags.includes(this.state.searchText);
                }),
            });
        } else {
            this.setState({ posts: this.state.all_posts });
        }
    }

    addComment(comment, postID) {
        const posts_copy = this.state.posts.slice();
        const postIndex = getPostIndex(this.state.posts, postID);

        const new_comment = {
            commentID: this.state.posts[postIndex].commentCount + 1,
            user: this.state.current_username,
            text: comment,
        };

        posts_copy[postIndex].comments = this.state.posts[
            postIndex
        ].comments.concat(new_comment);

        posts_copy[postIndex].commentCount++;

        this.setState({
            posts: posts_copy,
        });
    }

    render() {
        return (
            <div className="myblog-container">
                <div>
                    <Navbar
                        view="profile"
                        profile={this}
                        following={this.state.following}
                        current_user={this.state.profile_username}
                        current_user_role={this.state.profile_user_role}
                        profileImg={this.state.profile_profileImg}
                    />
                </div>
                <div className="blog-middle-area">
                    <div className="search-bar">
                        {" "}
                        {/* needs a component */}
                        <SearchBar
                            value={this.state.searchText}
                            onChange={(newValue) => this.setState({ searchText: newValue })}
                            onRequestSearch={() => this.searchRequest()}
                        />
                    </div>
                    {/* map posts  */}
                    <div className="post-area">
                        <PostList
                            current_username={this.state.current_username}
                            app_users={this.state.app_users}
                            posts={this.state.posts}
                            addComment={this.addComment}
                            profileImg={this.state.profileImg}
                            page={this}
                            role={this.state.current_user_role}
                        />
                    </div>
                </div>
                <div>
                    <PermanentDrawerRight
                        app={this.props.app}
                        profile={this}
                        following={this.state.following}
                        followers={this.state.followers}
                    />
                </div>
            </div>
        );
    }
}

export default Profile;
