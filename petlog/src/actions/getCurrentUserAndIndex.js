// get the current_username's user object

export default function getCurrentUserAndIndex(app_users, current_username) {
  let current_user_index = 0;
  let current_user;
  while (current_user_index < app_users.length) {
    if (app_users[current_user_index].username === current_username) {
      current_user = app_users[current_user_index];
      break;
    }
    current_user_index += 1;
  }
  return [current_user_index, current_user];
}
