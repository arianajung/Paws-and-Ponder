export const removeComment = (page, postID, commentID) => {
    const posts_copy = page.state.posts.slice();

    const filteredComments = page.state.posts[postID - 1].comments.filter((c) => {
        return c.commentID !== commentID;
    });

    posts_copy[postID - 1].comments = page.state.posts[
      postID - 1
    ].comments = filteredComments;

    // posts_copy[postID - 1].commentCount--;

    page.setState({
      posts: posts_copy,
    });
};