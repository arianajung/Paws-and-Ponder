import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";

export default function updateBookmarkedStatus(
  app_users,
  current_username,
  post,
  bookmarked
) {
  const [current_user_index, current_user] = getCurrentUserAndIndex(
    app_users,
    current_username
  );

  const current_bookmarks = app_users[current_user_index].bookmarks;

  let updatedBookmarks;
  if (bookmarked === true) {
    updatedBookmarks = current_bookmarks.slice();
    updatedBookmarks.push(post);
  } else {
    updatedBookmarks = current_bookmarks.filter((p) => {
      return p.postID !== post.postID;
    });
  }

  current_user.bookmarks = updatedBookmarks;

  let newAppUsers = app_users.slice();
  newAppUsers.splice(current_user_index, 1, current_user);
}
