import React from "react";
import PostList from "../PostList/PostList";
import Navbar from "../Navbar/Navbar";
import SearchBar from "material-ui-search-bar";
import PermanentDrawerRight from "../DrawerMenu/Drawer";
import "./Main.css";
import { Typography } from "@material-ui/core";
import { getCurrentUser } from "../../actions/user";

/* Main page where the user views all of the posts made by people that they follow*/
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/main");

        console.log(props)

        this.state = {
            searchText: "",
            posts: [],
            currentUser: null,
            type: "main",
            //     current_username: current_user.username,
            //     current_user_role: current_user.role,
            //     profileImg: current_user.profileImg,
            //     bookmarks: current_user.bookmarks,
            //     posts: current_user.mainPosts,
            //     comment_count: current_user.commentCount,
            //     all_posts: current_user.mainPosts,
        };
    }

    componentDidMount() {
        getCurrentUser(this);
        console.log("Main.js ComponentDidMount()");
        if (this.props.location.state !== undefined && this.props.location.state.clickedTag !== undefined) {
            this.setState({ searchText: this.props.location.state.clickedTag })
            this.setState({ type: "searching" })
        }
    }

    // componentDidUpdate() {
    //     if (this.state.req === "searched") {
    //         this.setState({ req: "main" });
    //     }
    // }

    render() {
        const { app } = this.props;
        return (
            <div className="main-container">
                <div>
                    <Navbar app={app} view="main" />
                </div>
                <div className="main-middle-area">
                    <div className="search-bar">
                        <SearchBar
                            value={this.state.searchText}
                            placeholder="Search by Tags or Usernames"
                            onCancelSearch={() => {
                                this.setState({ searchText: "" })
                                this.setState({ type: "refresh" })
                            }
                            }
                            onChange={(newValue) =>
                                this.setState({ searchText: newValue })
                            }
                            onRequestSearch={() => {
                                if (this.state.searchText === "")
                                    this.setState({ type: "refresh" })
                                else
                                    this.setState({ type: "searching" })
                            }}
                        />
                    </div>
                    <div className="post-area">
                        <PostList
                            currentUser={this.state.currentUser}
                            type={this.state.type}
                            search_text={this.state.searchText}
                            app={app}
                            page={this}
                        // curr_uid={app.state.curr_uid}
                        // app_users={this.state.app_users}
                        //posts={this.state.posts}
                        // addComment={this.addComment}
                        // profileImg={this.state.profileImg}
                        // role={this.state.current_user_role}
                        />

                    </div>
                </div>
                <div>
                    <PermanentDrawerRight app={app} page={this} />
                </div>
            </div>
        );
    }
}

export default Main;
