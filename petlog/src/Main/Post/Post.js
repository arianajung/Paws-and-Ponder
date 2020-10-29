import React from "react";
import { uid } from "react-uid";
import "./Post.css";
import Comment from "../../MyBlog/Comment/Comment"
import TextField from "@material-ui/core/TextField";
// Need to change this to import specific user image instead
import imgsrc from './static/img_1.jpg';

/* A Post Component */
class Post extends React.Component {
    addComment() {
        console.log("test")
    }

    render() {
        // create comment components 
        const comments = this.props.comments.map((comment) => {
            return (
                <Comment 
                    key={uid(comment)}
                    comment_user={comment.user}
                    comment_text={comment.text}
                />
            )
        })

        const { user, text } = this.props;
        return (
            <div>
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
                <div className="comment-area">
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="leave a comment"
                        onChange={() => {this.addComment()}}
                    />
                    {comments}
                </div>
            </div>
        );
    }
}

export default Post;
