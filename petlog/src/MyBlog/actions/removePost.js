import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";

export const removePost = (myBlog, postID, current_username, app_users) => {
  const filteredPosts = myBlog.state.posts.filter((p) => {
    return p.postID !== postID;
  });
  myBlog.setState({
    posts: filteredPosts,
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
