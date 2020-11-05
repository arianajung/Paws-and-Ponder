import React, { Component } from "react";

// material-ui imports
import SearchBar from "material-ui-search-bar";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";

// component imports
import PermanentDrawerRight from "../Main/DrawerMenu/Drawer";
import Navbar from "../Main/Navbar/Navbar";
import PostList from "./../PostList/PostList";
import postImg from "./static/post_img.jpeg";
import { removePost } from "./actions/removePost";

// css
import "./MyBlog.css";

class MyBlog extends Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    this.state = {
      // keeps track of the user that is currently logged in,
      // can be turned into a prop (in the future)
      current_user: "user",

      search_blog_text: "",

      new_post_text: "",

      new_post_img: "",

      // temporary, just to make hardcoded adding posts work
      post_count: 1,

      // posts can have images, need to take care of that
      posts: [
        {
          postID: 1,
          date: "30/10/2020",
          user: "user",
          text: "hi i like cats :D",
          image: "",
          comments: [
            {
              user: "Ariana",
              text:
                "wow me too \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
            },
            {
              user: "Fred",
              text: "bunnies are better",
            },
          ],
        },
      ],

      following: ["Ovi", "Ariana", "Fred"],

      followers: ["Sherry", "Fred"],
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
      user: this.state.current_user,
      text: comment,
    };

    posts_copy[postID - 1].comments = this.state.posts[
      postID - 1
    ].comments.concat(new_comment);

    this.setState({
      posts: posts_copy,
    });
  }

  // need to collect time clicked
  makePost(e) {
    const new_date = new Date();
    const date = new_date.getDate();
    const month = new_date.getMonth() + 1;
    const year = new_date.getFullYear();

    const str_date = `${date}/${month}/${year}`;

    const new_post = {
      postID: this.state.post_count + 1,
      date: new Date().toLocaleString(),
      user: this.state.current_user,
      text: this.state.new_post_text,
      image: this.state.new_post_img,
      comments: [],
    };
    const posts_copy = this.state.posts.slice();

    this.setState({
      new_post_text: "",
      new_post_img: "",
      post_count: this.state.post_count + 1,
      posts: [new_post].concat(this.state.posts),
    });
  }

  attachImage(e) {
    this.setState({ new_post_img: postImg });
  }

  render() {
    return (
      <div className="myblog-container">
        <div>
          <Navbar />
        </div>
        <div>
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
              posts={this.state.posts}
              addComment={this.addComment}
              myBlog={this}
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
