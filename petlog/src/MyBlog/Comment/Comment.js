import React, { Component } from "react";

import imgsrc from '../../Main/Post/static/img_1.jpg';


// css
import "./Comment.css";

class Comment extends Component {
    // not sure if needs a state yet
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="comment">
                <div className="comment-icon-and-name">
                    <img id="user-icon" src={imgsrc} alt="tempImage"></img>
                    
                </div>
                <div className="comment-content">
                    <div id="comment-name">{this.props.comment_user}</div>
                    <div id="comment-text">{this.props.comment_text}</div>
                </div>
            </div>
        )
    }s
}

export default Comment