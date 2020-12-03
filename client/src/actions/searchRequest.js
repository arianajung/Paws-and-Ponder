export default function searchRequest(props) {
  //console.log(props)
  if (props.state.searchText !== "") {
    props.setState({
      posts: props.state.all_posts.filter((post) => {
        //Filter to retain the posts that contains the same tag or made by the user (not case-sensitive)
        return post.tags.map(tag => tag.toLowerCase()).includes(props.state.searchText.toLowerCase()) ||
        post.user.toLowerCase() === props.state.searchText.toLowerCase();
      }),
    });
  } else {
    props.setState({ posts: props.state.all_posts });
  }
}