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
  }

  //Triggered when a search request is sent
  searchRequest() {
    console.log(this.state.searchText);
  }

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
              isMain={true}
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

export default Main;
