import React from "react";
import { uid } from "react-uid";
import Grid from "@material-ui/core/Grid";
import Post from "./../Main/Post/Post";

/* Component for the List of Posts */
class PostList extends React.Component {
  render() {
    const {
      current_username,
      app_users,
      posts,
      addComment,
      myBlog,
      bookmarksView,
      profileImg,
    } = this.props;
    /* Our post list. */
    return (
      <Grid className="post-list">
        {posts.map((post) => (
          <Post
            key={uid(post)}
            current_username={current_username}
            app_users={app_users}
            postID={post.postID}
            post={post}
            addComment={addComment}
            myBlog={myBlog}
            bookmarksView={bookmarksView}
            profileImg={profileImg}
          />
        ))}
      </Grid>
    );
  }
}

export default PostList;
