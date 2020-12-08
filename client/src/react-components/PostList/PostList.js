import React from "react";
import { uid } from "react-uid";
import Grid from "@material-ui/core/Grid";
import Post from "../Post/Post";
import { getPosts, getUserPosts, getProfilePosts, getSearchedPosts } from "../../actions/user";

/* Component for the List of Posts */
class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: [],
            type: props.type,
            currentuser: props.currentUser,
            search_text: props.search_text,
        };
    }

    componentDidMount() {
        console.log("Postlist mounted ", this.state.type);
        if (this.state.type === "main") {
            getPosts(this);
        } else if (this.state.type === "profile") {
            // console.log(this.props.profileUser.username);
            // getProfilePosts(this, this.props.profileUser.username);
            getProfilePosts(this);
        } else if (this.state.type === "blog") {
            getUserPosts(this);
            this.setState({ currentuser: this.props.currentUser });
        }
    }

    async componentDidUpdate() {
        if (this.state.type === "profile") {
            if (this.state.currentuser !== this.props.currentUser) {
                await this.setState({ currentuser: this.props.currentUser });
                getProfilePosts(this);
            }   
        } 
        // Autistic way to retrieve search posts, I can't figure out an easier way :c
        else if (this.props.type === "searching"){
            getSearchedPosts(this, this.props.search_text, this.props.page);
            console.log("searching posts")
        } else if (this.props.type === "searched") {
            console.log("done searching")
        } else if (this.props.type === "refresh"){
            getPosts(this);
            this.props.page.setState({type : "main"})
        }
        // invoked whenever a modification happens in a view (so far only in MyBlog.js), i.e. add post, delete post
        else if (this.props.type !== this.state.type) {
            console.log("call getUserPosts to update things in postList");
            getUserPosts(this);
        }
    }

    render() {
        // console.log("postlist posts: " + this.state.postList);
        const {
            currentUser, // need
            // app_users,
            // addComment,
            // myBlog,
            // profileImg,
            // bookmarks,
            // page,
            // role,
        } = this.props;

        /* Our post list. */
        return (
            <Grid className="post-list">
                {this.state.postList.map((post) => (
                    <Post
                        key={uid(post)}
                        currentUser={currentUser}
                        // app_users={app_users}
                        // postID={postID}
                        post={post}
                        // addComment={addComment}
                        // myBlog={myBlog}
                        // bookmarks={bookmarks}
                        // profileImg={""}
                        // page={page}
                        // role={role}
                        postlist={this}
                    />
                ))}
            </Grid>
        );
    }
}

export default PostList;
