import React from "react";
import { uid } from "react-uid";
import "./Post.css";
import Comment from "../../MyBlog/Comment/Comment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
// Need to change this to import specific user image instead
import imgsrc from "../../static/img_1.jpg";
import BookmarkIcon from "@material-ui/icons/TurnedInNot";
import BookmarkedIcon from "@material-ui/icons/TurnedIn";
import { removePost } from "../../MyBlog/actions/removePost";
// import bookmarkPost from "../actions/bookmarkPost";
// import unbookmarkPost from "../actions/unbookmarkPost";
import updateBookmarkedStatus from "../actions/updateBookmarkedStatus";

/* A Post Component */
class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      new_comment: "",
      bookmarked: false,
    };
  }

  // handles button press
  buttonPress(e) {
    if (this.state.new_comment.trim() !== "") {
      // if no white space
      this.props.addComment(this.state.new_comment, this.props.postID);
      this.setState({ new_comment: "" });
    }
  }

  handleBookmarkBtn(app_users, current_username, post) {
    if (post.bookmarked === true) {
      this.setState({ bookmarked: false });
      updateBookmarkedStatus(app_users, current_username, post, false);
    } else {
      this.setState({ bookmarked: true });
      updateBookmarkedStatus(app_users, current_username, post, true);
    }
  }

  render() {
    const {
      current_username,
      app_users,
      post,
      postID,
      myBlog,
      profileImg,
    } = this.props;

    let removeBtn;
    // should retrieve this information from server later
    if (post.user === current_username) {
      removeBtn = (
        <IconButton onClick={() => removePost(myBlog, postID)}>
          <DeleteIcon />
        </IconButton>
      );
    } else {
      removeBtn = "";
    }

    let bookmarkIcon;
    if (post.user !== current_username) {
      if (post.bookmarked === false) {
        bookmarkIcon = <BookmarkIcon />;
      } else {
        bookmarkIcon = <BookmarkedIcon />;
      }
    }

    // should retrieve this information from server later
    let userImg;
    if (post.user === current_username) {
      userImg = <img id="userIcon" src={profileImg} alt="tempImage"></img>;
    } else {
      userImg = <img id="userIcon" src={imgsrc} alt="tempImage"></img>;
    }

    // create comment components
    const comments = post.comments.map((comment) => {
      return (
        <Comment
          key={uid(comment)}
          current_username={current_username}
          comment_user={comment.user}
          comment_text={comment.text}
          profileImg={profileImg}
        />
      );
    });

    return (
      <div>
        <div className="post-wrapper">
          <div className="post">
            <div className="user-profile">
              <div className="left-container">
                <div className="userIconContainer">{userImg}</div>
                <div className="post-info">
                  <div id="post-user">{post.user}</div>
                  <div id="post-date">{post.date}</div>
                </div>
              </div>
              <div className="buttons">
                <div className="removeBtn">{removeBtn}</div>
                <div className="bookmarkBtn">
                  <IconButton
                    onClick={() =>
                      this.handleBookmarkBtn(app_users, current_username, post)
                    }
                  >
                    {bookmarkIcon}
                  </IconButton>
                </div>
              </div>

              {/* Need to add more user stuff here like user pic*/}
            </div>
            <div className="post-content">
              <img id="post-img" src={post.image}></img>
              <div id="post-text">{post.text}</div>
            </div>
          </div>

          <div className="comment-area">
            <TextField
              className="leave-a-comment"
              variant="outlined"
              label="leave a comment"
              multiline
              value={this.state.new_comment}
              onChange={(e) => {
                this.setState({ new_comment: e.target.value });
              }}
            />
            <div className="button-container">
              <Button
                id="comment-button"
                size="small"
                onClick={(e) => this.buttonPress(e)}
              >
                Comment
              </Button>
            </div>
            <div className="comments">{comments}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
