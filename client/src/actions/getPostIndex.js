export default function getPostIndex(posts, postID) {
  let postIndex = 0;
  while (postIndex < posts.length) {
    if (posts[postIndex].postID === postID) {
      break;
    }
    postIndex += 1;
  }
  return postIndex;
}
