import React from "react";
import { uid } from "react-uid";
import Grid from '@material-ui/core/Grid';
import Post from "./../Main/Post/Post";

/* Component for the List of Posts */
class PostList extends React.Component {
  render() {
    const { posts } = this.props;

    /* Our post list. */
    return (
      <Grid className="post-list">
          {posts.map(post => (
            <Post
              key={uid(post)}
              post={post}
            />
          ))}
      </Grid>
    );
  }
}

export default PostList;
