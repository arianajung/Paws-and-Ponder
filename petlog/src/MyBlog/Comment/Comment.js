import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex"
import { handleProfileBtn } from "../../actions/handleProfileBtn"
import { removeComment } from "../actions/removeComment";
import MyBlog from "../../MyBlog/MyBlog"
import { Link } from "react-router-dom";

// css
import "./Comment.css";

class Comment extends Component {
  render() {
    const {
      current_username,
      comment_user,
      comment_text,
      profileImg,
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
    } else if (page instanceof MyBlog) {
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

    // // should retrieve this information from server later
    // let userImg;
    // if (comment_user === current_username) {
    //   userImg = <img id="user-icon" src={profileImg} alt="profileImg"></img>;
    // } else {
    //   userImg = <img id="user-icon" src={imgsrc} alt="tempImage"></img>;
    // }

    // should retrieve this information from server later
    let userImg;
    if (comment_user === current_username) {
      userImg = (
        <Link to={"/blog"}>
          <img id="user-icon" src={profileImg} alt="profileImg" />
        </Link>
      )
    } else {
      userImg = (
        <Link to={"/profile"} onClick={() => handleProfileBtn(page.props.app, comment_user, page)}>
          <img id="user-icon" src={getCurrentUserAndIndex(page.props.app.state.users, comment_user)[1].profileImg} alt="tempImage" />
        </Link>
      )
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
