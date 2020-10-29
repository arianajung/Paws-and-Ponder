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
            <div id="comment">
                <img className="userIcon" src={imgsrc} alt="tempImage"></img>
                <span id="comment-name">{this.props.comment_user}: </span>
                <span id="comment-text">{this.props.comment_text}</span>
            </div>
        )
    }
}

export default Comment