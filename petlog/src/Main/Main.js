import React from "react";
import PostList from "./../PostList/PostList";
import Navbar from "./Navbar/Navbar";
import SearchBar from "material-ui-search-bar";
import PermanentDrawerRight from "./DrawerMenu/Drawer";
import "./Main.css";
import getPostIndex from "../actions/getPostIndex";

/* Main page where the user views all of the posts made by people that they follow*/
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);

    // Obtain information about current user
    const { current_username, users } = props.app.state;
    const current_user = users.filter((user) => {
      return user.username === current_username;
    })[0];

    this.state = {
      //searchText for search bar
      app_users: props.app.state.users,
      searchText: "",
      current_username: current_user.username,
      profileImg: current_user.profileImg,
      following: current_user.following,
      followers: current_user.followers,
      posts: current_user.mainPosts,
    };

    // Temperoal solution to render all initial posts when the search filters
    // some of the posts away, would be nice if current_user.mainPosts is accessable
    // from other functions
    this.initialposts = this.state.posts;
  }

  //Triggered when a search request is sent
  // Filter to only display posts that include the tags in the search bar
  searchRequest() {
    console.log(this.state.searchText);
    if (this.state.searchText !== "") {
      this.setState({
        posts: this.initialposts.filter((post) => {
          return post.tags.includes(this.state.searchText);
        }),
      });
    } else {
      this.setState({ posts: this.initialposts });
    }
  }

  addComment(comment, postID) {
    const posts_copy = this.state.posts.slice();

    const new_comment = {
      user: this.state.current_username,
      text: comment,
    };

    // posts_copy[postID - 1].comments = this.state.posts[
    //   postID - 1
    // ].comments.concat(new_comment);

    const postIndex = getPostIndex(this.state.posts, postID);

    posts_copy[postIndex].comments = this.state.posts[
      postIndex
    ].comments.concat(new_comment);

    this.setState({
      posts: posts_copy,
    });
  }

  render() {
    return (
      <div className="main-container">
        <div>
          <Navbar view="main" />
        </div>
        <div className="main-middle-area">
          <div className="search-bar">
            <SearchBar
              value={this.state.searchText}
              onChange={(newValue) => this.setState({ searchText: newValue })}
              onRequestSearch={() => this.searchRequest()}
            />
          </div>
          <div className="post-area">
            <PostList
              current_username={this.state.current_username}
              app_users={this.state.app_users}
              posts={this.state.posts}
              addComment={this.addComment}
              profileImg={this.state.profileImg}
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

export default Main;
