import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex"
import { handleProfileBtn } from "../../actions/profile"
import { removeComment } from "../actions/removeComment";
import MyBlog from "../../MyBlog/MyBlog";
import AdminDropDownMenu from "../../Main/Post/AdminPostMenu/AdminPostMenu";
import { Link } from "react-router-dom";

// css
import "./Comment.css";

class Comment extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      current_username,
      comment_user,
      comment_text,
      profileImg,
      commentID,
      page,
      postID,
      role,
    } = this.props;

    // if the current page is user's personal blog or the comment is their own
    const removeButton = (page instanceof MyBlog || comment_user === current_username) ? ( 
      <div className="removeBtn">
        <IconButton 
          className="remove-button-element"
          onClick={() => removeComment(page, postID, commentID)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    ) : null

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

    const adminButton2 = (isPost) => (role === "admin" && comment_user !== current_username) ? (
      <div className="admin-button">
        <AdminDropDownMenu
          user={comment_user}
          page={page}
          isPost={isPost}
          commentID={commentID}
          postID={postID}
        />
      </div>
    ) : null

    return (
      <div className="comment">
        <div className="comment-icon">{userImg}</div>
        <div className="comment-content">
          <div id="comment-name">{comment_user}</div>
          <div id="comment-text">{comment_text}</div>
        </div>
        <div className="buttons">
          {removeButton}
          {adminButton2(false)}
        </div>
      </div>
    );
  }
  s;
}

export default Comment;
