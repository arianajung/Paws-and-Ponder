import React from "react";
import Post from "./Post/Post";
import { uid } from "react-uid";

/* Main page where the user views all of the posts made by people that they follow*/
class Main extends React.Component {
  /* NEED TO MODIFY STATE - we should be getting the "user" information from Login's state*/
  state = {
    posts: [
      {
        user: "Ariana",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
      },
      {
        user: "Sherry",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia imperdiet ipsum, a accumsan ligula pulvinar ut. Aliquam at accumsan velit, quis molestie magna. Proin sit amet finibus nibh, a mattis nunc. Duis tincidunt dolor eu nisl semper posuere. Sed ligula dolor, scelerisque quis lacus et, ultrices blandit neque.",
      },
    ],
  };

  render() {
    return this.state.posts.map((post) => (
      <Post key={uid(post)} user={post.user} text={post.text} />
    ));
  }
}

export default Main;
