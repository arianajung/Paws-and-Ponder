import React, { Component } from "react";
import { uid } from "react-uid";

// material-ui imports
import SearchBar from "material-ui-search-bar";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Chip from "@material-ui/core/Chip";

// component imports
import PermanentDrawerRight from "../DrawerMenu/Drawer";
import Navbar from "../Navbar/Navbar";
import PostList from "../PostList/PostList";
import postImg from "./static/post_img.jpeg";
import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";
import getPostIndex from "../../actions/getPostIndex";
import searchRequest from "../../actions/searchRequest";

// css
import "./MyBlog.css";

import { getCurrentUser, makePost } from "../../actions/user";

class MyBlog extends Component {
    constructor(props) {
        super(props);
        //this.addComment = this.addComment.bind(this);

        // Obtain information about current user

        // const [current_user_index, current_user] = getCurrentUserAndIndex(
        //   users,
        //   current_username
        // );

        this.state = {
            posts: [],
            new_post_text: "",
            new_post_img: "",
            new_tag: "",
            new_post_tags: [],
            req: "blog",
            current_username: "bruh", //props.current_username,
            current_user_role: "user", //props.current_user_role,
            profileImg: "",
            following: [],
            followers: [],
            currentUser: null,
        };
        // this.state = {
        //   app_users: props.app.state.users,
        //   userCreds: props.app.state.userCreds,
        //   current_user_index: current_user_index,
        //   current_username: current_user.username,
        //   current_user_role: current_user.role,
        //   profileImg: current_user.profileImg,
        //   searchText: "",
        //   new_post_text: "",
        //   new_post_img: "",
        //   new_tag: "",
        //   new_post_tags: [],
        //   total_num_posts: props.app.state.total_num_posts,
        //   posts: current_user.userPosts,
        //   following: current_user.following,
        //   followers: current_user.followers,
        //   //this is added for search purposes, need a way to know all posts that exist currently
        //   //the post we had can be understood as "posts to be displayed" -- Fred
        //   all_posts: current_user.userPosts,
        // };
        // For searching purposes, display initial posts if searching with empty string
    }

    // retrieves posts made by this user from the database and stores it in state
    // async componentDidMount() {
    // await fetch('/api/getUserPosts')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.setState({ posts: data.posts });
    //     return false;
    //   });

    // }

    componentDidMount() {
        console.log("MyBlog.js: componenetDidMount()");
        getCurrentUser(this);
    }

    componentDidUpdate() {
        if (this.state.req === "makePost") {
            console.log("MyBlog.js: componenetDidUpdate()");
            this.setState({ req: "blog" });
        }
    }

    // handles adding a comment that reflects the changes in the instance of App.js which in turn
    // sets sends the POST request to the backend
    // addComment(comment, postID) {
    //   const posts_copy = this.state.posts.slice();
    //   const postIndex = getPostIndex(this.state.posts, postID);

    //   const new_comment = {
    //     commentID: this.state.posts[postIndex].commentCount + 1,
    //     user: this.state.current_username,
    //     text: comment,
    //   };

    //   posts_copy[postIndex].comments = this.state.posts[
    //     postIndex
    //   ].comments.concat(new_comment);

    //   posts_copy[postIndex].commentCount++;

    //   this.setState({
    //     posts: posts_copy,
    //   });
    // }

    // reflects changes to App.js which in turn send the updates to the backend
    // makePost(e) {
    //   if (
    //     this.state.new_post_text.trim() !== "" ||
    //     this.state.new_post_img.trim() !== ""
    //   ) {
    //     const new_post = {
    //       postID: this.state.total_num_posts + 1,
    //       date: new Date().toLocaleString(),
    //       user: this.state.current_username,
    //       text: this.state.new_post_text,
    //       image: this.state.new_post_img,
    //       bookmarked: false,
    //       commentCount: 0,
    //       comments: [],
    //       tags: this.state.new_post_tags,
    //     };

    //     let posts_copy = this.state.posts.slice();
    //     posts_copy = [new_post].concat(this.state.posts);
    //     let all_posts_copy = [new_post].concat(this.state.all_posts);

    //     // update the same info in App component
    //     let current_user = this.state.app_users.slice()[
    //       this.state.current_user_index
    //     ];
    //     current_user.userPosts = posts_copy;
    //     let newUsers = this.state.app_users.slice();
    //     newUsers.splice(this.state.current_user_index, 1, current_user);
    //     this.setState({
    //       new_post_text: "",
    //       new_post_img: "",
    //       new_tag: "",
    //       new_post_tags: [],
    //       total_num_posts: this.state.total_num_posts + 1,
    //       posts: posts_copy,
    //       app_users: newUsers,
    //       all_posts: all_posts_copy,
    //     });

    //     this.props.app.incrementTotalNumPosts();
    //   }
    // }

    /*
     logic to make a post
     1. re-render MyBlog by calling setState({req: "makePost"})
     2. pass the updated this.state.req as a prop to PostList
     3. (in PostList.js) "type" in PostList's state !== our prop "makePost", hence getUserPosts called
     4. componentDidUpdate() invoked in MyBlog as rendering finished - call setState({req: "blog"})
     5. MyBlog re-renders, but since "type" in PostList's state === our new req prop "blog", getUserPosts not called
    */
    makePostButtonPress(e) {
        const { new_post_text, new_post_img, new_post_tags } = this.state;
        if (new_post_text.trim() !== "") {
            // add the post to the database
            makePost(new_post_text, new_post_img, new_post_tags);
            this.setState({ req: "makePost" });
        }
    }

    attachImage(e) {
        this.setState({ new_post_img: postImg });
    }

    addTag(e) {
        if (
            this.state.new_tag !== "" &&
            !this.state.new_post_tags.includes(this.state.new_tag)
        ) {
            this.setState({
                new_post_tags: this.state.new_post_tags.concat([
                    this.state.new_tag,
                ]),
                new_tag: "",
            });
        }
    }

    handleDeleteTag(tag) {
        console.log(`Deleting tag: ${tag}`);
        this.setState({
            new_post_tags: this.state.new_post_tags.filter(function (value) {
                return value !== tag;
            }),
        });
    }

    render() {
        return (
            <div className="myblog-container">
                <div>
                    <Navbar
                        app={this.props.app}
                        view="myblog"
                        currentUser={this.state.currentUser}

                        // view="myBlog"
                        // current_user={this.state.current_username}
                        // current_user_role={this.state.current_user_role}
                        // profileImg={this.state.profileImg}
                    />
                </div>
                <div className="blog-middle-area">
                    <div className="search-bar">
                        {" "}
                        {/* needs a component */}
                        <SearchBar
                            value={this.state.searchText}
                            placeholder="Search by Tags or Usernames"
                            onCancelSearch={() =>
                                this.setState({ searchText: "" })
                            }
                            onChange={(newValue) =>
                                this.setState({ searchText: newValue })
                            }
                            onRequestSearch={() => searchRequest(this)}
                        />
                    </div>

                    <div className="make-a-post-container">
                        <div>
                            {/* Server called needed here to display a preview of the image chosen by the user */}
                            <img
                                className="preview-img"
                                src={this.state.new_post_img}
                                alt=""
                            />
                            <TextField
                                className="make-a-post-text"
                                variant="outlined"
                                label="write about your post"
                                value={this.state.new_post_text}
                                multiline
                                onChange={(e) => {
                                    this.setState({
                                        new_post_text: e.target.value,
                                    });
                                }}
                            />
                        </div>

                        <div className="post-options">
                            <div className="tagsContainer">
                                Current Tags:{" "}
                                {this.state.new_post_tags.map((tag) => {
                                    return (
                                        <Chip
                                            className="tag"
                                            key={uid(tag)}
                                            size="small"
                                            label={tag}
                                            onDelete={() =>
                                                this.handleDeleteTag(tag)
                                            }
                                        />
                                    );
                                })}
                            </div>

                            <TextField
                                className="new-tag-text"
                                variant="outlined"
                                label="Add a tag to your post"
                                value={this.state.new_tag}
                                onChange={(e) => {
                                    this.setState({ new_tag: e.target.value });
                                }}
                                onKeyPress={(ev) => {
                                    if (ev.key === "Enter") {
                                        ev.preventDefault();
                                        this.addTag();
                                    }
                                }}
                            />

                            <IconButton
                                id="add-tag-button"
                                onClick={(e) => this.addTag(e)}
                            >
                                <AddCircleIcon />
                            </IconButton>

                            <IconButton
                                id="attach-button"
                                onClick={(e) => this.attachImage(e)}
                            >
                                <InsertPhotoIcon />
                            </IconButton>
                            <Button
                                id="post-button"
                                size="small"
                                onClick={(e) => this.makePostButtonPress(e)}
                            >
                                POST
                            </Button>
                        </div>
                    </div>

                    {/* map posts  */}
                    <div className="post-area">
                        <PostList
                            // current_username={this.state.current_username}
                            //app_users={this.state.app_users}
                            // posts={this.state.posts}
                            type={this.state.req}
                            // addComment={this.addComment}
                            myBlog={this}
                            profileImg={this.state.profileImg}
                            page={this}
                            role={this.state.current_user_role}
                        />
                    </div>
                </div>
                <div>
                    <PermanentDrawerRight
                        app={this.props.app}
                        page={this}
                        // following={this.state.following}
                        // followers={this.state.followers}
                    />
                </div>
            </div>
        );
    }
}

export default MyBlog;
