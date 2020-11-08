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
      current_user_role: current_user.role,
      profileImg: current_user.profileImg,
      following: current_user.following,
      followers: current_user.followers,
      posts: current_user.mainPosts,
      comment_count: current_user.commentCount,
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
          return post.tags.includes(this.state.searchText) || 
          post.user.toLowerCase() === this.state.searchText.toLowerCase();
        }),
      });
    } else {
      this.setState({ posts: this.initialposts });
    }
  }

  addComment(comment, postID) {
    const posts_copy = this.state.posts.slice();
    const postIndex = getPostIndex(this.state.posts, postID);

    const new_comment = {
      commentID: this.state.posts[postIndex].commentCount + 1,
      user: this.state.current_username,
      text: comment,
    };

    posts_copy[postIndex].comments = this.state.posts[
      postIndex
    ].comments.concat(new_comment);

    posts_copy[postIndex].commentCount++;

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
              placeholder="Search by Tags or Usernames"
              onCancelSearch={() => this.setState({ searchText: "" })}
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
              page={this}
              role={this.state.current_user_role}
            />
          </div>
        </div>
        <div>
          <PermanentDrawerRight
            app={this.props.app}
            profile={this}
            following={this.state.following}
            followers={this.state.followers}
          />
        </div>
      </div>
    );
  }
}

export default Main;
