<<<<<<< HEAD:petlog/src/actions/remove/removePost.js
import getCurrentUserAndIndex from "../getCurrentUserAndIndex";
import MyBlog from "../../react-components/MyBlog/MyBlog";
import Profile from "../../react-components/Profile/Profile";
=======
import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";
import MyBlog from "../MyBlog";
import Profile from "../../Profile/Profile.js"
>>>>>>> 7c43ab3fc2b3502bfd0e2d7a69a59a3959275b3d:petlog/src/MyBlog/actions/removePost.js

export default function removePost(blog_page, user_postID) {
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
  const [current_user_index, current_user] = getCurrentUserAndIndex(
    app_users,
    selected_user.username
  );

  if (blog_page instanceof MyBlog || blog_page instanceof Profile) {
    current_user.userPosts = filteredPosts;
  } else
    current_user.mainPosts = filteredPosts;
    
  let newUsers = app_users.slice();
  newUsers.splice(current_user_index, 1, current_user);
};
