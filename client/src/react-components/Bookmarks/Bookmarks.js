import React from "react";
import Navbar from "../Navbar/Navbar";
import PostList from "../PostList/PostList";
import PermanentDrawerRight from "../DrawerMenu/Drawer";
import "./Bookmarks.css";

import { getCurrentUser } from "../../actions/users";

class Bookmarks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            type: "bookmarks",
        };
    }

    componentDidMount() {
        getCurrentUser(this);
    }

    render() {
        return (
            <div className="bookmarks-container">
                <div>
                    <Navbar app={this.props.app} view="bookmarks" />
                </div>
                <div className="bookmarks-middle-area">
                    <div className="post-area">
                        <PostList
                            currentUser={this.state.currentUser}
                            type={this.state.type}
                            app={this.props.app}
                            page={this}
                        />
                    </div>
                </div>
                <div>
                    <PermanentDrawerRight app={this.props.app} page={this} />
                </div>
            </div>
        );
    }
}
export default Bookmarks;
