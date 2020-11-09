import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";

export default function updateBookmarkedStatus(
  app_users,
  current_username,
  post,
  bookmark
) {
  const [current_user_index, current_user] = getCurrentUserAndIndex(
    app_users,
    current_username
  );

  const updatedPost = post;
  if (bookmark === true) {
    updatedPost.bookmarked = true;
  } else {
    updatedPost.bookmarked = false;
  }

  // is bookmarked from Main
  const updatedMainPosts = current_user.mainPosts.slice();
  updatedMainPosts.splice(post.postID - 1, 1, updatedPost);
  current_user.mainPosts = updatedMainPosts;

  let newAppUsers = app_users.slice();
  newAppUsers.splice(current_user_index, 1, current_user);
}