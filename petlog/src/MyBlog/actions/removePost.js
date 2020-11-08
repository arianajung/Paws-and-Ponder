export const removePost = (myBlog, postID) => {
  const filteredPosts = myBlog.state.posts.filter((p) => {
    return p.postID !== postID;
  });

  //this is added for search purposes, need a way to know all posts that exist currently
  //the post we had can be understood as "posts to be displayed" -- Fred
  const allfilteredPosts = myBlog.state.all_posts.filter((p) => {
    return p.postID !== postID;
  });
  myBlog.setState({
    posts: filteredPosts,
    all_posts: allfilteredPosts
  });
};
