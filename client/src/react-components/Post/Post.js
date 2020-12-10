import React from "react";
import { uid } from "react-uid";
import "./Post.css";
import Comment from "../Comment/Comment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
// Need to change this to import specific user image instead
import BookmarkIcon from "@material-ui/icons/TurnedInNot";
import BookmarkedIcon from "@material-ui/icons/TurnedIn";
import Chip from "@material-ui/core/Chip";
import updateBookmarkedStatus from "../../actions/updateBookmarkedStatus/updateBookmarkedStatus";

import AdminDropDownMenu from "../AdminMenu/AdminDropDownMenu";
import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";
import { handleProfileBtn } from "../../actions/profile";
import { Link } from "react-router-dom";
import Moment from "react-moment";
// import moment from "moment";

import {
    addComment,
    removePost,
    getCurrentUser,
    bookmarkPost,
    unbookmarkPost,
    getSpecificUser,
} from "../../actions/user";

/* A Post Component */
class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            new_comment: "",
            currentUser: "",
            bookmarked: false,
            specificUser: "",
        };
    }

    // // handles adding a new comment
    addCommentButtonPress(e) {
        if (this.state.new_comment.trim() !== "") {
            // if no white space
            addComment(
                this.state.new_comment,
                this.props.post._id,
                this.props.postlist
            );
            this.setState({ new_comment: "" });
        }
    }

    bookmarkButtonPress(pid) {
        // initially alrdy bookmarked OR has been bookmarked during "curr render"
        if (
            this.state.currentUser.bookmarks.includes(pid) ||
            this.state.bookmarked === true
        ) {
            unbookmarkPost(pid, this.props.postlist);
            this.updateCurrentUserBookmarksState(pid);
            this.setState({ bookmarked: false });
            alert("Removed post from bookmarks.");
        } else {
            bookmarkPost(pid);
            this.setState({ bookmarked: true });
            alert("Added post to bookmarks.");
        }
    }

    // modify bookmarks array in this.state.currUser.bookmarks
    updateCurrentUserBookmarksState(pid) {
        const updatedBookmarks = this.state.currentUser.bookmarks.filter(
            (p) => {
                return p !== pid;
            }
        );
        this.state.currentUser.bookmarks = updatedBookmarks;
    }

    componentDidMount() {
        getCurrentUser(this);
        getSpecificUser(this, this.props.post.owner_id)
    }

    render() {
        const {
            // currentUser,
            // app_users,
            post,
            postlist,
            // myBlog,
            // profileImg,
            // page,
            // role,
            app,
            page,
        } = this.props;

        const bookmarkOrRemoveButton =
            post.owner_id === this.state.currentUser._id ? ( // bookmark button
                <div className="removeBtn">
                    <IconButton
                        className="dark-button-element"
                        onClick={() => removePost(post._id, postlist)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ) : (
                <div className="bookmarkBtn">
                    <IconButton
                        className="dark-button-element"
                        onClick={() => this.bookmarkButtonPress(post._id)}
                    >
                        <BookmarkIcon />
                    </IconButton>
                </div>
            );

        const adminButton = (isPost) =>
            post.owner_id !== this.state.currentUser._id &&
            this.state.currentUser.role === "admin" ? (
                <div className="admin-button">
                    <AdminDropDownMenu
                        user={post.owner}
                        page={postlist.page}
                        postID={post._id}
                        isPost={isPost}
                        postlist={postlist}
                        banID={post.owner_id}
                    />
                </div>
            ) : null;

        let userImg;
        if (this.state.specificUser._id === this.state.currentUser._id) {
          userImg = (
            <Link to={"/blog"}>
              <img id="userIcon" src={this.state.currentUser.profileImg} alt={this.state.currentUser.username} />
            </Link>
          );
        } else {
          userImg = (
            <Link
              to={"/profile"}
              onClick={() => handleProfileBtn(app, this.state.specificUser, page)}
            >
              <img
                id="userIcon"
                src={this.state.specificUser.profileImg}
                alt={this.state.specificUser.username}
              />
            </Link>
          );
        }

        // create comment components
        const comments = post.comments.map((comment) => {
            return (
                <Comment
                    key={uid(comment)}
                    postID={post._id}
                    currentUser={this.state.currentUser}
                    comment={comment}
                    postList={postlist}
                    postOwner={post.owner}
                    // comment_user={comment.owner}
                    // comment_text={comment.textContent}
                    // profileImg={profileImg}
                    // commentID={comment._id}
                    // page={page}
                    // postID={postID}
                    // role={role}
                    app={app}
                    page={page}
                />
            );
        });

        const tags = post.tags.map((tag) => {
            return (
                <Chip
                    className="tag"
                    key={uid(tag)}
                    clickable
                    size="small"
                    label={tag}
                />
            );
        });

        const images = post.images.map((image) => {
            return (
                <div>
                    <img className="image-container" src={image} alt=""></img>
                </div>
            );
        });

        return (
            <div>
                <div className="post-wrapper">
                    <div className="post">
                        <div className="user-profile">
                            <div className="left-container">
                                <div className="userIconContainer">
                                    {userImg}
                                </div>
                                <div className="post-info">
                                    <div id="post-user">{post.owner}</div>
                                    <div id="post-date">
                                        <Moment format="YYYY/MM/DD HH:mm">
                                            {post.timeStamp}
                                        </Moment>
                                    </div>
                                </div>
                            </div>
                            <div className="buttons">
                                {bookmarkOrRemoveButton}
                                {adminButton(true)}
                            </div>

                            {/* Need to add more user stuff here like user pic*/}
                        </div>
                        <div className="post-content">
                            <div id="post-text">{post.textContent}</div>

                            <div className="image-list">{images}</div>
                        </div>
                        <div className="tagsContainer">Tags: {tags}</div>
                    </div>

                    <div className="comment-area">
                        <TextField
                            className="leave-a-comment"
                            variant="outlined"
                            label="leave a comment"
                            multiline
                            value={this.state.new_comment}
                            onChange={(e) => {
                                this.setState({ new_comment: e.target.value });
                            }}
                        />
                        <div className="button-container">
                            <Button
                                id="comment-button"
                                size="small"
                                onClick={(e) => this.addCommentButtonPress(e)}
                            >
                                Comment
                            </Button>
                        </div>
                        <div className="comments">{comments}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;
