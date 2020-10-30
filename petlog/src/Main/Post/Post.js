import React from "react";
import { uid } from "react-uid";
import "./Post.css";
import Comment from "../../MyBlog/Comment/Comment"
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
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

    // handles button press
    buttonPress(e) {
        if (this.state.new_comment.trim() !== '') { // if no white space
            this.props.addComment(this.state.new_comment, this.props.postID)
        }
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
                                <img id="userIcon" src={imgsrc} alt="tempImage"></img>
                            </div>
                            <div className="post-info">
                                <div id="post-user">{post.user}</div>
                                <div id="post-date">{post.date}</div>
                            </div>
                            {/* Need to add more user stuff here like user pic*/}
                        </div>
                        <div className="post-content">
                            <div id="post-text">{post.text}</div>
                        </div>
                    </div>

                    <div className="comment-area">
                        <TextField 
                            className="leave-a-comment"
                            variant="outlined"
                            label="leave a comment"
                            onChange={(e) => {this.setState({ new_comment: e.target.value })}}
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
