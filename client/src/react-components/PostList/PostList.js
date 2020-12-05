import React from "react";
import { uid } from "react-uid";
import Grid from "@material-ui/core/Grid";
import Post from "../Post/Post";
import { getPosts, getUserPosts, getProfilePosts } from "../../actions/user";

/* Component for the List of Posts */
class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: [],
            type: props.type,
            currentuser: props.currentUser,
        };
    }

    componentDidMount() {
        console.log("Postlist mounted");
        if (this.state.type === "main") {
            getPosts(this);
        } else if (this.state.type === "profile") {
            // console.log(this.props.profileUser.username);
            // getProfilePosts(this, this.props.profileUser.username);
            getProfilePosts(this);
        } else if (this.state.type === "blog") {
            getUserPosts(this);
        }
    }

    async componentDidUpdate() {
        // console.log("POSTLIST PROPS TYPE", this.props.type);
        if (this.state.type === "profile") {
            if (this.state.currentuser !== this.props.currentUser) {
                await this.setState({ currentuser: this.props.currentUser });
                getProfilePosts(this);
            }
            // invoked whenever a modification happens in a view (so far only in MyBlog.js), i.e. add post, delete post
        } else if (this.props.type !== this.state.type) {
            console.log("call getUserPosts to update things in postList");
            getUserPosts(this);
        }
    }

    render() {
        // console.log("postlist posts: " + this.state.postList);
        const {
            currentUser, // need
            app_users,
            addComment,
            myBlog, // need
            profileImg,
            bookmarks,
            page,
            role,
        } = this.props;

        /* Our post list. */
        return (
            <Grid className="post-list">
                {this.state.postList.map((post) => (
                    <Post
                        key={uid(post)}
                        currentUser={currentUser}
                        app_users={app_users}
                        // postID={post.postID}
                        post={post}
                        addComment={addComment}
                        myBlog={myBlog}
                        bookmarks={bookmarks}
                        profileImg={""}
                        page={page}
                        role={role}
                        postlist={this}
                    />
                ))}
            </Grid>
        );
    }
}

export default PostList;
