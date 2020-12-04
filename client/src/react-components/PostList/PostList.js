import React from "react";
import { uid } from "react-uid";
import Grid from "@material-ui/core/Grid";
import Post from "../Post/Post";
import { getPosts } from "../../actions/user";

/* Component for the List of Posts */
class PostList extends React.Component {
    state = {
        postList: [],
    };

    componentDidMount() {
        getPosts(this); //
        console.log("Postlist ComponentDidMount Triggered")
    }

    render() {
        const {
            currentUser,
            app_users,
            posts,
            addComment,
            myBlog,
            profileImg,
            bookmarks,
            page,
            role,
        } = this.props;

        console.log(this.state.postList);

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
