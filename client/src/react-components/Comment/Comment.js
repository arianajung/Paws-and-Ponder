import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";
import { handleProfileBtn } from "../../actions/profile";
import MyBlog from "../MyBlog/MyBlog";
import AdminDropDownMenu from "../AdminMenu/AdminDropDownMenu";
import { Link } from "react-router-dom";
import { removeComment } from "../../actions/user";

// css
import "./Comment.css";

class Comment extends Component {
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

        // should retrieve this information from server later
        // let userImg;
        // if (comment_user === current_username) {
        //     userImg = (
        //         <Link to={"/blog"}>
        //             <img id="user-icon" src={profileImg} alt="profileImg" />
        //         </Link>
        //     );
        // } else {
        //     userImg = (
        //         <Link
        //             to={"/profile"}
        //             onClick={() =>
        //                 handleProfileBtn(page.props.app, comment_user, page)
        //             }
        //         >
        //             <img id="user-icon" src={getCurrentUserAndIndex(page.props.app.state.users, comment_user)[1].profileImg} alt="tempImage" />
        //         </Link>
        //     );
        // }

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
                {/* <div className="comment-icon">{userImg}</div> */}
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
