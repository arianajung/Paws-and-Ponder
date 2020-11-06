import React, { Component } from "react";
import imgsrc from "../../static/img_1.jpg";

// css
import "./Comment.css";

class Comment extends Component {
  // not sure if needs a state yet
  constructor(props) {
    super(props);
  }

  render() {
    const { comment_user, comment_text, profileImg } = this.props;

    // should retrieve this information from server later
    let userImg;
    if (comment_user === "user") {
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
      </div>
    );
  }
  s;
}

export default Comment;
