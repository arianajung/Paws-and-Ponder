import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";
import { handleProfileBtn } from "../../actions/profile";
import MyBlog from "../MyBlog/MyBlog";
import AdminDropDownMenu from "../AdminMenu/AdminDropDownMenu";
import { Link } from "react-router-dom";
import { removeComment, getSpecificUser } from "../../actions/user";

// css
import "./Comment.css";

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            specificUser: "",
        };
    }

    componentDidMount() {
        getSpecificUser(this, this.props.comment.owner_id)
    }

    render() {
        const {
            currentUser,
            comment,
            postID,
            postList,
            postOwner,
            // comment_user,
            // comment_text,
            // profileImg,
            // commentID,
            // page,
            // role,
            app,
            page,
        } = this.props;

        const removeButton =
            (comment.owner_id === currentUser._id) ? (
                <div className="removeBtn">
                    <IconButton
                        className="dark-button-element"
                        onClick={() =>
                            removeComment(postID, comment._id, postList)
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ) : null;

        let userImg;
        if (this.state.specificUser._id === currentUser._id) {
            userImg = (
                <Link to={"/blog"}>
                    <img id="user-icon" src={currentUser.profileImg} alt={currentUser.username} />
                </Link>
            );
        } else {
            userImg = (
                <Link
                    to={"/profile"}
                    onClick={() =>
                        handleProfileBtn(app, this.state.specificUser, page)
                    }
                >
                    <img id="user-icon" src={this.state.specificUser.profileImg} alt={this.state.specificUser.username} />
                </Link>
            );
        }

        const adminButton = (isPost) => (currentUser.role === "admin" && comment.owner_id !== currentUser._id) ? (
            <div className="admin-button">
              <AdminDropDownMenu
                user={postOwner}
                page={postList.page}
                postID={postID}
                commentID={comment._id}
                isPost={isPost}
                postlist={postList}
                banID={comment.owner_id}
              />
            </div>
          ) : null

        // const adminButton2 = (isPost) =>
        //     role === "admin" && comment_user !== currentUser ? (
        //         <div className="admin-button">
        //             <AdminDropDownMenu
        //                 user={comment_user}
        //                 page={page}
        //                 isPost={isPost}
        //                 commentID={commentID}
        //                 postID={postID}
        //             />
        //         </div>
        //     ) : null;

        return (
            <div className="comment">
                <div className="comment-icon">{userImg}</div>
                <div className="comment-content">
                    <div id="comment-name">{comment.owner}</div>
                    <div id="comment-text">{comment.textContent}</div>
                </div>
                <div className="buttons">
                    {removeButton}
                    {adminButton(false)}
                </div>
            </div>
        );
    }
    s;
}

export default Comment;
