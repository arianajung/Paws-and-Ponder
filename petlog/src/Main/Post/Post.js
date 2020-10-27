import React from "react";
import "./Post.css";

/* A Post Component */
class Post extends React.Component {
  render() {
    const { user, text } = this.props;
    return (
      <div className="post">
        <div className="user-profile">
          {/* Need to add more user stuff here like user pic*/}
          <h3 className="username">{user}</h3>
        </div>
        <div className="text">
          <p>{text}</p>
        </div>
      </div>
    );
  }
}

export default Post;
