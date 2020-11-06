import React from "react";
import { uid } from "react-uid";
import Grid from "@material-ui/core/Grid";
import Post from "./../Main/Post/Post";

/* Component for the List of Posts */
class PostList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { posts, addComment, myBlog, profileImg } = this.props;
    /* Our post list. */
    return (
      <Grid className="post-list">
        {posts.map((post) => (
          <Post
            key={uid(post)}
            postID={post.postID}
            post={post}
            addComment={addComment}
            myBlog={myBlog}
            profileImg={profileImg}
          />
        ))}
      </Grid>
    );
  }
}

export default PostList;
