export default function DeleteIcon(myBlog, postID, fromMyBlog) {
  <IconButton
    className="delete-button"
    onClick={() => removePost(myBlog, postID)}
  >
    <DeleteIcon />
  </IconButton>;
}
