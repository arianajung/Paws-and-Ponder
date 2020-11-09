import getPostIndex from "../../actions/getPostIndex"

export const removeComment = (page, postID, commentID) => {
    const postIndex = getPostIndex(page.state.posts, postID);
    const posts_copy = page.state.posts.slice();

    const filteredComments = page.state.posts[postIndex].comments.filter((c) => {
        return c.commentID !== commentID;
    });

    posts_copy[postIndex].comments = page.state.posts[
        postIndex
    ].comments = filteredComments;

    page.setState({
        posts: posts_copy,
    });
};