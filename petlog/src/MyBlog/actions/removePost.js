import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";

export const removePost = (blog_page, user_postID) => {
  const {current_username, app_users} = blog_page.state

  const filteredPosts = blog_page.state.all_posts.filter((p) => {
    return p.postID !== user_postID;
  });

  //this is added for search purposes, need a way to know all posts that exist currently
  //the post we had can be understood as "posts to be displayed" -- Fred
  const allfilteredPosts = blog_page.state.all_posts.filter((p) => {
    return p.postID !== user_postID;
  });

  blog_page.setState({
    posts: filteredPosts,
    all_posts: allfilteredPosts,
  });

  // need to update database/back-end somewhere here
  // when an admin deletes a user's post, it needs to delete the post from the user's post list 
  // as well as the current user's post list (if we still have that representation after adding back-end) -- Ovi
  
  const selected_user = app_users.find( ({ username }) => username === current_username );

  const [current_user_index, current_user] = getCurrentUserAndIndex(
    app_users,
    selected_user.username
  );

  // update the same info in App state
  if (current_username === "admin") 
    current_user.mainPosts = filteredPosts;
  else
    current_user.userPosts = filteredPosts;
  let newUsers = app_users.slice();
  newUsers.splice(current_user_index, 1, current_user);
};
