import React from "react";
import Navbar from "../Main/Navbar/Navbar";
import SearchBar from "material-ui-search-bar";
import PermanentDrawerRight from "../Main/DrawerMenu/Drawer";
import "./Bookmarks.css";

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    // Obtain information about current user
    const { current_username, users } = props.app.state;
    const current_user = users.filter((user) => {
      return user.username === current_username;
    })[0];

    this.state = {
      //searchText for search bar
      searchText: "",
      current_username: current_user.username,
      profileImg: current_user.profileImg,
      following: current_user.following,
      followers: current_user.followers,
      posts: [],
    };
  }

  render() {
    return (
      <div className="bookmarks-container">
        <div>
          <Navbar view="bookmarks" />
        </div>
        <div>
          <div className="search-bar">
            <SearchBar
              value={this.state.searchText}
              onChange={(newValue) => this.setState({ searchText: newValue })}
              onRequestSearch={() => this.searchRequest()}
            />
          </div>
          {/* <div className="post-area">
            <PostList
              posts={this.state.posts}
              addComment={this.addComment}
              myBlog={""}
              profileImg={this.state.profileImg}
            />
          </div> */}
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
export default Bookmarks;
