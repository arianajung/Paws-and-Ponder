import React, { Component } from "react";
import { uid } from "react-uid";

import imgsrc from '../../Main/Post/static/img_1.jpg';


// material-ui imports
import SearchBar from "material-ui-search-bar";

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
                <img class="userIcon" src={imgsrc} alt="tempImage"></img>
                <span id="comment-name">{this.props.comment_user}: </span>
                <span id="comment-text">{this.props.comment_text}</span>
            </div>
        )
    }
}

export default Comment