import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";
import MyBlog from "../MyBlog";
import Main from "../../Main/Main.js";
import Profile from "../../Profile/Profile.js"

export const removePost = (blog_page, user_postID) => {
  const {current_username, profile_username, app_users} = blog_page.state

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
  
  const selected_user = app_users.find( ({ username }) => username === ((blog_page instanceof Profile) ? profile_username : current_username) );
  console.log((blog_page instanceof Profile) ? profile_username : current_username)
  console.log(selected_user)
  const [current_user_index, current_user] = getCurrentUserAndIndex(
    app_users,
    selected_user.username
  );

  console.log(current_user)
  if (blog_page instanceof MyBlog || blog_page instanceof Profile) {
    current_user.userPosts = filteredPosts;
  } else
    current_user.mainPosts = filteredPosts;
    
  let newUsers = app_users.slice();
  newUsers.splice(current_user_index, 1, current_user);
};
