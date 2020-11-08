import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";

export const removePost = (myBlog, postID, current_username, app_users) => {
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

  console.log(current_username);

  const [current_user_index, current_user] = getCurrentUserAndIndex(
    app_users,
    current_username
  );

  // update the same info in App state
  current_user.userPosts = filteredPosts;
  let newUsers = app_users.slice();
  newUsers.splice(current_user_index, 1, current_user);
};
