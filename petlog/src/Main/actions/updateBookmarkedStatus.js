export default function updateBookmarkedStatus(
  app_users,
  current_username,
  post,
  bookmark
) {
  // get the current_username's user object
  let current_user_index = 0;
  let current_user;
  while (current_user_index < app_users.length) {
    if (app_users[current_user_index].username === current_username) {
      current_user = app_users[current_user_index];
      break;
    }
    current_user_index += 1;
  }

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
  // console.log(newAppUsers[0].mainPosts);
}
