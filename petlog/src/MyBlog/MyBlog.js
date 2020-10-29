import React, { Component } from "react";
import { uid } from "react-uid";

// material-ui imports
import SearchBar from "material-ui-search-bar";

// component imports
import PermanentDrawerRight from "../Main/DrawerMenu/Drawer";
import Navbar from "../Main/Navbar/Navbar";
import Post from "../Main/Post/Post";

// css
import "./MyBlog.css";

class MyBlog extends Component {
  constructor(props) {
    super(props)
    this.addComment = this.addComment.bind(this)
    this.state = {
      // keeps track of the user that is currently logged in,
      // can be turned into a prop (in the future)
      current_user: 'user',

      search_blog_text: '',

      // posts can have images, need to take care of that
      posts: [
        {
          postID: 1,
          user: 'Ovi',
          text: 'hi i like cats :D',
          comments: [
            {
              user: 'Ariana',
              text: 'wow me too \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.'
            },
            {
              user: 'Fred',
              text: 'bunnies are better'
            }
          ]
        }
      ]
    }
  }

  // fetch post info from db and store in state
  componentDidMount() {
    console.log("MyBlog.js: componenetDidMount()")
  }

  // needs a componenet since will be used multiple times 
  search_blog_posts() {

  }

  addComment(comment, postID) {
    const posts_copy = this.state.posts.slice()

    const new_comment = {
      user: this.state.current_user,
      text: comment
    }

    posts_copy[postID - 1].comments = this.state.posts[postID-1].comments.concat(new_comment)

    this.setState({
      posts: posts_copy
    })
  }

  render() {
    // map posts 
    const posts = this.state.posts.map((post) => {
      return (
        <Post
          key={post.postID} 
          postID={post.postID} 
          user={post.user} 
          text={post.text} 
          comments = {post.comments}
          addComment={this.addComment}
        />
      )
    })
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <PermanentDrawerRight />
        </div>
        <div className="search-bar"> {/* needs a component */}
          <SearchBar
            value={this.state.searchText}
            onChange={(newValue) => this.setState({ searchText: newValue })}
            onRequestSearch={() => this.searchRequest()}
          />
        </div>
        <div className="post-area">
          {posts}
        </div>
      </div>
    )
  }
}

export default MyBlog