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
        const { post } = this.props;

        // create comment components 
        const comments = post.comments.map((comment) => {
            return (
                <Comment 
                    key={uid(comment)}
                    comment_user={comment.user}
                    comment_text={comment.text}
                />
            )
        })

        return (
            <div>
                <div className="post-wrapper">
                    <div className="post">
                        <div className="user-profile">
                            <div className='userIconContainer'>
                                <img className="userIcon" src={imgsrc} alt="tempImage"></img>
                            </div>
                            {/* Need to add more user stuff here like user pic*/}
                            <h3 className="username">{post.user}</h3>
                        </div>
                        <div className="postContent">
                            <p>{post.text}</p>
                        </div>
                    </div>
                    <div className="comment-area">
                        <div className="test">
                            <TextField 
                                className="leave-a-comment"
                                variant="outlined"
                                margin="normal"
                                label="leave a comment"
                                onChange={() => {this.addComment()}}
                            />
                        </div>
                        <div className="comments">
                            {comments}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;
