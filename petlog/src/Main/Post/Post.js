import React from "react";
import { uid } from "react-uid";
import "./Post.css";
import Comment from "../../MyBlog/Comment/Comment"
import TextField from "@material-ui/core/TextField";
// Need to change this to import specific user image instead
import imgsrc from './static/img_1.jpg';

/* A Post Component */
class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            new_comment: ''
        }
    }
    addComment() {
        console.log("test")
    }

    keyPress(e) {
        if (e.keyCode == 13) {
            this.props.addComment(this.state.new_comment, this.props.postID)
        }
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
                <div className="post-wrapper">
                    <div className="post">
                        <div className="user-profile">
                            <div className='userIconContainer'>
                                <img className="userIcon" src={imgsrc} alt="tempImage"></img>
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
                            className="leave-a-comment"
                            variant="outlined"
                            margin="normal"
                            label="leave a comment"
                            onChange={(e) => {this.setState({ new_comment: e.target.value })}}
                            onKeyDown={(e) => {this.keyPress(e)}}
                        />
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
