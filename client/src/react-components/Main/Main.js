import React from "react";
import PostList from "../PostList/PostList";
import Navbar from "../Navbar/Navbar";
import SearchBar from "material-ui-search-bar";
import PermanentDrawerRight from "../DrawerMenu/Drawer";
import "./Main.css";
import { getCurrentUser } from "../../actions/users";

/* Main page where the user views all of the posts made by people that they follow*/
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/main");

        console.log(props);

        this.state = {
            searchText: "",
            posts: [],
            currentUser: null,
            type: "main",
        };
    }

    componentDidMount() {
        getCurrentUser(this);
        console.log("Main.js ComponentDidMount()");
        if (
            this.props.location.state !== undefined &&
            this.props.location.state.clickedTag !== undefined
        ) {
            this.setState({ searchText: this.props.location.state.clickedTag });
            this.setState({ type: "searching" });
        }
    }

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
                                this.setState({ searchText: "" });
                                this.setState({ type: "refresh" });
                            }}
                            onChange={(newValue) =>
                                this.setState({ searchText: newValue })
                            }
                            onRequestSearch={() => {
                                if (this.state.searchText === "")
                                    this.setState({ type: "refresh" });
                                else this.setState({ type: "searching" });
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
