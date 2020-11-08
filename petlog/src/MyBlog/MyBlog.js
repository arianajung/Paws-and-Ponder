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
import PermanentDrawerRight from "../Main/DrawerMenu/Drawer";
import Navbar from "../Main/Navbar/Navbar";
import PostList from "./../PostList/PostList";
import postImg from "./static/post_img.jpeg";

// css
import "./MyBlog.css";

class MyBlog extends Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);

    // Obtain information about current user
    const { current_username, users } = props.app.state;
    let current_user_index = 0;
    let current_user;

    while (current_user_index < users.length) {
      if (users[current_user_index].username === current_username) {
        current_user = users[current_user_index];
        break;
      }
      current_user_index += 1;
    }

    this.state = {
      app_users: props.app.state.users,
      current_user_index: current_user_index,
      current_username: current_user.username,
      current_user_role: current_user.role,
      profileImg: current_user.profileImg,
      search_blog_text: "",
      new_post_text: "",
      new_post_img: "",
      new_tag: "",
      new_post_tags: [],
      post_count: current_user.userPostCount,
      posts: current_user.userPosts,
      following: current_user.following,
      followers: current_user.followers,
    };
  }

  // fetch post info from db and store in state
  componentDidMount() {
    console.log("MyBlog.js: componenetDidMount()");
  }

  // needs a componenet since will be used multiple times
  search_blog_posts() {}

  addComment(comment, postID) {
    const posts_copy = this.state.posts.slice();

    const new_comment = {
      commentID: this.state.posts[postID - 1].commentCount + 1,
      user: this.state.current_username,
      text: comment,
    };

    posts_copy[postID - 1].comments = this.state.posts[
      postID - 1
    ].comments.concat(new_comment);

    posts_copy[postID - 1].commentCount++;

    this.setState({
      posts: posts_copy,
    });
  }

  // need to collect time clicked
  makePost(e) {
    if (
      this.state.new_post_text.trim() !== "" ||
      this.state.new_post_img.trim() !== ""
    ) {
      const new_date = new Date();
      const date = new_date.getDate();
      const month = new_date.getMonth() + 1;
      const year = new_date.getFullYear();

      const str_date = `${date}/${month}/${year}`;

      const new_post = {
        postID: this.state.post_count + 1,
        date: new Date().toLocaleString(),
        user: this.state.current_username,
        text: this.state.new_post_text,
        image: this.state.new_post_img,
        bookmarked: false,
        commentCount: 0,
        comments: [],
        tags: this.state.new_post_tags,
      };

      let posts_copy = this.state.posts.slice();
      posts_copy = [new_post].concat(this.state.posts);

      // update the same info in App component
      let current_user = this.state.app_users.slice()[
        this.state.current_user_index
      ];
      current_user.userPosts = posts_copy;
      let newUsers = this.state.app_users.slice();
      newUsers.splice(this.state.current_user_index, 1, current_user);

      this.setState({
        new_post_text: "",
        new_post_img: "",
        new_tag: "",
        new_post_tags: [],
        post_count: this.state.post_count + 1,
        posts: posts_copy,
        app_users: newUsers,
      });
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
        new_post_tags: this.state.new_post_tags.concat([this.state.new_tag]),
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
            view="myBlog"
            current_user={this.state.current_username}
            current_user_role={this.state.current_user_role}
            profileImg={this.state.profileImg}
          />
        </div>
        <div className="blog-middle-area">
          <div className="search-bar">
            {" "}
            {/* needs a component */}
            <SearchBar
              value={this.state.searchText}
              onChange={(newValue) => this.setState({ searchText: newValue })}
              onRequestSearch={() => this.searchRequest()}
            />
          </div>

          <div className="make-a-post-container">
            <div>
              {/* Server called needed here to display a preview of the image chosen by the user */}
              <img className="preview-img" src={this.state.new_post_img} />
              <TextField
                className="make-a-post-text"
                variant="outlined"
                label="write about your post"
                value={this.state.new_post_text}
                multiline
                onChange={(e) => {
                  this.setState({ new_post_text: e.target.value });
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
                      onDelete={() => this.handleDeleteTag(tag)}
                    />
                  );
                })}
              </div>

              <TextField
                className="new-tag-text"
                label="Add a tag to your post"
                value={this.state.new_tag}
                onChange={(e) => {
                  this.setState({ new_tag: e.target.value });
                }}
              />

              <IconButton id="add-tag-button" onClick={(e) => this.addTag(e)}>
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
                onClick={(e) => this.makePost(e)}
              >
                POST
              </Button>
            </div>
          </div>

          {/* map posts  */}
          <div className="post-area">
            <PostList
              current_username={this.state.current_username}
              app_users={this.state.app_users}
              posts={this.state.posts}
              addComment={this.addComment}
              myBlog={this}
              profileImg={this.state.profileImg}
              isMain={false}
              page={this}
              role={this.state.current_user_role}
            />
          </div>
        </div>
        <div>
          <PermanentDrawerRight
            following={this.state.following}
            followers={this.state.followers}
          />
        </div>
      </div>
    );
  }
}

export default MyBlog;
