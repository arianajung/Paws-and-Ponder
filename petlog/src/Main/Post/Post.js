import React from "react";
import "./Post.css";

// Need to change this to import specific user image instead
import imgsrc from './static/img_1.jpg';

/* A Post Component */
class Post extends React.Component {
  render() {
    const { user, text } = this.props;
    return (
      <div className="post">    
        <div className="user-profile">
            <div className='userIconContainer'>
              <img class="userIcon" src={imgsrc} alt="tempImage"></img>
            </div>
            {/* Need to add more user stuff here like user pic*/}
            <h3 className="username">{user}</h3>
        </div>
        <div className="postContent">
            <p>{text}</p>
        </div>
      </div>
    );
  }
}

export default Post;
