import React from "react";
import Post from "./Post/Post";
import { uid } from "react-uid";
import Navbar from "./Navbar/Navbar";
import SearchBar from "material-ui-search-bar";
import PermanentDrawerRight from "./DrawerMenu/Drawer";
import "./Main.css";


/* Main page where the user views all of the posts made by people that they follow*/
class Main extends React.Component {
  /* NEED TO MODIFY STATE - we should be getting the "user" information from Login's state*/
  state = {
    //searchText for search bar
    searchText : "",

    posts: [
      {
        user: "Ariana",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
        comments: []
      },
      {
        user: "Sherry",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
        comments: []
      },
    ],
  };

  //Triggered when a search request is sent
  searchRequest(){
    console.log(this.state.searchText)
  }

  render() {
    return (
      <>
        <div>
          <Navbar />
        </div>
        <div>
          <PermanentDrawerRight />
        </div>
        <div className="search-bar">
          <SearchBar
            value={this.state.searchText}
            onChange={(newValue) => this.setState({ searchText: newValue })}
            onRequestSearch={() => this.searchRequest()}
          />
        </div>
        <div className="post-area">
          {this.state.posts.map((post) => (
            <Post 
              key={uid(post)} 
              user={post.user} 
              text={post.text} 
              comments={post.comments}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Main;
