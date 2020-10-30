import React from "react";
import PostList from "./../PostList/PostList";
import Navbar from "./Navbar/Navbar";
import SearchBar from "material-ui-search-bar";
import PermanentDrawerRight from "./DrawerMenu/Drawer";
import "./Main.css";

/* Main page where the user views all of the posts made by people that they follow*/
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);

    /* NEED TO MODIFY STATE - we should be getting the "user" information from Login's state*/
    this.state = {
      //searchText for search bar
      searchText: "",

      // current user, default is "user"
      current_user: "user",

      posts: [
        {
          postID: 1,
          user: "Ariana",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
          comments: [],
        },
        {
          postID: 2,
          user: "Sherry",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
          comments: [],
        },
        {
          postID: 3,
          user: "Fred",
          text:
            "Some text to enable scrolling. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.scelerisque quis lacus et, ultrices blandit neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
          comments: [],
        },
        {
          postID: 4,
          user: "Enable Scrolling",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
          comments: [],
        },
      ],

      following: ["Ovi", "Ariana", "Fred"],

      followers: ["Sherry", "Fred"],
    };
  }

  //Triggered when a search request is sent
  searchRequest() {
    console.log(this.state.searchText);
  }

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

  render() {
    return (
      <>
        <div>
          <Navbar />
        </div>
        <div>
          <PermanentDrawerRight
            following={this.state.following}
            followers={this.state.followers}
          />
        </div>
        <div className="search-bar">
          <SearchBar
            value={this.state.searchText}
            onChange={(newValue) => this.setState({ searchText: newValue })}
            onRequestSearch={() => this.searchRequest()}
          />
        </div>
        <div className="post-area">
          <PostList posts={this.state.posts} addComment={this.addComment} />
        </div>
      </>
    );
  }
}

export default Main;
