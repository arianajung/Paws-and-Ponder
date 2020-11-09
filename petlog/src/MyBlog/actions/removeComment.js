import getPostIndex from "../../actions/getPostIndex";

export const removeComment = (page, postID, commentID) => {
  console.log(page.state);
  const postIndex = getPostIndex(page.state.all_posts, postID);
  const posts_copy = page.state.all_posts.slice();

  const filteredComments = page.state.all_posts[postIndex].comments.filter(
    (c) => {
      return c.commentID !== commentID;
    }
  );

  posts_copy[postIndex].comments = page.state.all_posts[
    postIndex
  ].comments = filteredComments;

  page.setState({
    all_posts: posts_copy,
  });
};
