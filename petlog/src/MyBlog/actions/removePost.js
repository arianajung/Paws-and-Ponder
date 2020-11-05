export const removePost = (myBlog, postID) => {
  const filteredPosts = myBlog.state.posts.filter((p) => {
    return p.postID !== postID;
  });
  myBlog.setState({
    posts: filteredPosts,
  });
};
