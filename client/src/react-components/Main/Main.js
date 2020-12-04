import React from "react";
import PostList from "../PostList/PostList";
import Navbar from "../Navbar/Navbar";
import SearchBar from "material-ui-search-bar";
import PermanentDrawerRight from "../DrawerMenu/Drawer";
import "./Main.css";
import getPostIndex from "../../actions/getPostIndex";
import searchRequest from "../../actions/searchRequest";
import { Typography } from "@material-ui/core";

/* Main page where the user views all of the posts made by people that they follow*/
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/main");

        //this.addComment = this.addComment.bind(this);

        //this.addComment = this.addComment.bind(this);

        // Obtain information about current user

        // const { current_username, users } = props.app.state;

        // const current_user = users.filter((user) => {
        //     return user.username === current_username;
        // })[0];

        this.state = {
            //     //searchText for search bar
            //     app: props.app,
            //     app_users: props.app.state.users,
            //     userCreds: props.app.state.userCreds,
            searchText: "",
            //     current_username: current_user.username,
            //     current_user_role: current_user.role,
            //     profileImg: current_user.profileImg,
            //     following: current_user.following,
            //     followers: current_user.followers,
            //     bookmarks: current_user.bookmarks,
            //     posts: current_user.mainPosts,
            //     comment_count: current_user.commentCount,
            //     all_posts: current_user.mainPosts,
        };
    }

    // addComment(comment, postID) {
    //   const posts_copy = this.state.posts.slice();
    //   const postIndex = getPostIndex(this.state.posts, postID);

    //   const new_comment = {
    //     commentID: this.state.posts[postIndex].commentCount + 1,
    //     user: this.state.current_username,
    //     text: comment,
    //   };

    //   posts_copy[postIndex].comments = this.state.posts[
    //     postIndex
    //   ].comments.concat(new_comment);

    //   posts_copy[postIndex].commentCount++;

    //   this.setState({
    //     posts: posts_copy,
    //   });
    // }

    render() {
        const { history, app } = this.props;

        return (
            <div className="main-container">
                <div>
                    <Navbar app={app}view="main" />
                </div>
                {console.log(`Logged in as ${app.state.currentUser}`)}
                <div className="main-middle-area">
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
                    <div className="post-area">
                        <PostList
                            currentUser={app.state.currentUser}
                            curr_uid={app.state.curr_uid}
                            // app_users={this.state.app_users}
                            // posts={this.state.posts}
                            // addComment={this.addComment}
                            // profileImg={this.state.profileImg}
                            page={this}
                            // role={this.state.current_user_role}
                        />
                    </div>
                </div>
                <div>
                    {/* <PermanentDrawerRight
                        app={this.props.app}
                        page={this}
                        following={this.state.following}
                        followers={this.state.followers}
                    /> */}
                </div>
            </div>
        );
    }
}

export default Main;
