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
import Chip from "@material-ui/core/Chip";
import { removePost } from "../../MyBlog/actions/removePost";
import updateBookmarkedStatus from "../actions/updateBookmarkedStatus";
import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";
import MenuListComposition from "./AdminPostMenu/AdminPostMenu";

/* A Post Component */
class Post extends React.Component {
  constructor(props) {
    super(props);

    const { current_username, app_users, post } = this.props;
    const [current_user_index] = getCurrentUserAndIndex(
      app_users,
      current_username
    );

    // determine if this post is already bookmarked or not
    const bookmarkedVal = this.isBookmarked(
      app_users[current_user_index].bookmarks,
      post
    );

    this.state = {
      new_comment: "",
      bookmarked: bookmarkedVal,
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
    if (this.state.bookmarked === true) {
      updateBookmarkedStatus(app_users, current_username, post, false);
      this.setState({ bookmarked: false });
    } else {
      updateBookmarkedStatus(app_users, current_username, post, true);
      this.setState({ bookmarked: true });
    }
  }

  isBookmarked(bookmarks, post) {
    return (
      bookmarks.filter((p) => {
        return p.postID === post.postID;
      }).length > 0
    );
  }

  render() {
    const {
      current_username,
      app_users,
      post,
      postID,
      myBlog,
      profileImg,
      page,
      role,
    } = this.props;

    const bookmarkOrRemoveButton =
      post.user !== current_username ? ( // bookmark button
        <div className="bookmarkBtn">
          <IconButton
            onClick={() =>
              this.handleBookmarkBtn(app_users, current_username, post)
            }
          >
            {this.state.bookmarked === false ? (
              <BookmarkIcon />
            ) : (
              <BookmarkedIcon />
            )}
          </IconButton>
        </div>
      ) : (
        // remove button
        <div className="removeBtn">
          <IconButton
            onClick={() =>
              removePost(myBlog, postID, current_username, app_users)
            }
          >
            <DeleteIcon />
          </IconButton>
        </div>
      );

    const adminButton =
      role === "admin" ? (
        <div className="admin-button">
          <MenuListComposition>postUser={post.user}</MenuListComposition>
        </div>
      ) : null;

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
          commentID={comment.commentID}
          page={page}
          postID={postID}
          role={role}
        />
      );
    });

    const tags = post.tags.map((tag) => {
      return (
        <Chip
          className="tag"
          key={uid(tag)}
          clickable
          size="small"
          label={tag}
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
                {bookmarkOrRemoveButton}
                {adminButton}
              </div>

              {/* Need to add more user stuff here like user pic*/}
            </div>
            <div className="post-content">
              <img id="post-img" src={post.image} alt=""></img>
              <div id="post-text">{post.text}</div>
            </div>
            <div className="tagsContainer">Tags: {tags}</div>
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
