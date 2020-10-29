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
    this.state = {
      // keeps track of the user that is currently logged in,
      // can be turned into a prop (in the future)
      current_user: 'user',

      search_blog_text: '',

      // posts can have images, need to take care of that
      posts: [
        {
          user: 'Ovi',
          text: 'hi i like cats :D',
          comments: [
            {
              user: 'Ariana',
              text: 'wow me too'
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

  render() {
    // map posts 
    const posts = this.state.posts.map((post) => {
      return (
        <Post
          key={uid(post)} 
          user={post.user} 
          text={post.text} 
          comments = {post.comments}
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