import React from "react";
import Navbar from "../Main/Navbar/Navbar";
import PostList from "./../PostList/PostList";
import SearchBar from "material-ui-search-bar";
import PermanentDrawerRight from "../Main/DrawerMenu/Drawer";
import "./Bookmarks.css";
import getPostIndex from "../actions/getPostIndex";

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    // Obtain information about current user
    const { current_username, users } = props.app.state;
    const current_user = users.filter((user) => {
      return user.username === current_username;
    })[0];

    const bookmarkedPosts = current_user.mainPosts.filter((p) => {
      return p.bookmarked === true;
    });

    this.state = {
      //searchText for search bar
      app_users: props.app.state.users,
      searchText: "",
      current_username: current_user.username,
      profileImg: current_user.profileImg,
      following: current_user.following,
      followers: current_user.followers,
      bookmarks: bookmarkedPosts,
    };
    this.initialposts = this.state.bookmarks;
  }

  //Does not work as intended for the moment, if you unbookmark a post,
  //such post will still appear for a search until you switch the page
  searchRequest() {
    console.log(this.state.searchText);
    if (this.state.searchText !== "") {
      this.setState({
        bookmarks: this.initialposts.filter((post) => {
          return post.tags.includes(this.state.searchText) ||
          post.user.toLowerCase() === this.state.searchText.toLowerCase();
        }),
      });
    } else {
      this.setState({ bookmarks: this.initialposts });
    }
  }

  addComment(comment, postID) {
    const posts_copy = this.state.bookmarks.slice();

    const new_comment = {
      user: this.state.current_username,
      text: comment,
    };

    // let postIndex = 0;
    // while (postIndex < this.state.bookmarks.length) {
    //   if (this.state.bookmarks[postIndex].postID === postID) {
    //     break;
    //   }
    //   postIndex += 1;
    // }

    const postIndex = getPostIndex(this.state.bookmarks, postID);

    posts_copy[postIndex].comments = this.state.bookmarks[
      postIndex
    ].comments.concat(new_comment);

    this.setState({
      bookmarks: posts_copy,
    });
  }

  render() {
    return (
      <div className="bookmarks-container">
        <div>
          <Navbar view="bookmarks" />
        </div>
        <div className="bookmarks-middle-area">
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
              posts={this.state.bookmarks}
              app_users={this.state.app_users}
              bookmarksView={this}
              addComment={this.addComment}
              profileImg={this.state.profileImg}
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
export default Bookmarks;
