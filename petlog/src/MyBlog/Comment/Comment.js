import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import imgsrc from "../../static/img_1.jpg";
import { removeComment } from "../actions/removeComment";

// css
import "./Comment.css";

class Comment extends Component {
  render() {
    const {
      current_username,
      comment_user,
      comment_text,
      profileImg,
      isMain,
      commentID,
      page,
      postID,
      role
    } = this.props;
    let removeBtn = "";
    // should retrieve this information from server later
    if (role === "admin") {
      removeBtn = (
        <IconButton onClick={() => removeComment(page, postID, commentID)}>
          <DeleteIcon />
        </IconButton>
      );
    } else if (isMain === false) {
      removeBtn = (
        <IconButton onClick={() => removeComment(page, postID, commentID)}>
          <DeleteIcon />
        </IconButton>
      );
    } else if (comment_user === current_username) {
      removeBtn = (
        <IconButton onClick={() => removeComment(page, postID, commentID)}>
          <DeleteIcon />
        </IconButton>
      );
    }

    // should retrieve this information from server later
    let userImg;
    if (comment_user === current_username) {
      userImg = <img id="user-icon" src={profileImg} alt="profileImg"></img>;
    } else {
      userImg = <img id="user-icon" src={imgsrc} alt="tempImage"></img>;
    }

    return (
      <div className="comment">
        <div className="comment-icon">{userImg}</div>
        <div className="comment-content">
          <div id="comment-name">{comment_user}</div>
          <div id="comment-text">{comment_text}</div>
        </div>
        <div className="removeCommentBtn">{removeBtn}</div>
      </div>
    );
  }
  s;
}

export default Comment;
