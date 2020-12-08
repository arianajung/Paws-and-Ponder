import React, { Component, useRef } from "react";
import { uid } from "react-uid";

// material-ui imports
import SearchBar from "material-ui-search-bar";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Chip from "@material-ui/core/Chip";

// component imports
import PermanentDrawerRight from "../DrawerMenu/Drawer";
import Navbar from "../Navbar/Navbar";
import PostList from "../PostList/PostList";
import postImg from "./static/post_img.jpeg";
import getCurrentUserAndIndex from "../../actions/getCurrentUserAndIndex";
import getPostIndex from "../../actions/getPostIndex";
import searchRequest from "../../actions/searchRequest";

// css
import "./MyBlog.css";

import { getCurrentUser, makePost } from "../../actions/user";
import { addImage } from "../../actions/image";


const MAX_POSTS = 4;

const hiddenFileInput = React.createRef();

class MyBlog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            new_post_text: "",
            new_post_img: "",
            local_image_urls: [],
            image_files: [],
            new_tag: "",
            new_post_tags: [],
            req: "blog",
            // current_username: "bruh", //props.current_username,
            // current_user_role: "user", //props.current_user_role,
            // profileImg: "",
            // following: [],
            // followers: [],
            currentUser: null,
        };
    }

    componentDidMount() {
        getCurrentUser(this);
        //console.log("MyBlog.js: componenetDidMount()");
    }

    componentDidUpdate() {
        if (this.state.req === "makePost") {
            //console.log("MyBlog.js: componenetDidUpdate()");
            this.setState({ req: "blog" });
        }
    }

    /*
     logic to make a post
     1. re-render MyBlog by calling setState({req: "makePost"})
     2. pass the updated this.state.req as a prop to PostList
     3. (in PostList.js) "type" in PostList's state !== our prop "makePost", hence getUserPosts called
     4. componentDidUpdate() invoked in MyBlog as rendering finished - call setState({req: "blog"})
     5. MyBlog re-renders, but since "type" in PostList's state === our new req prop "blog", getUserPosts not called
    */
    makePostButtonPress = async (e) => {
        const { new_post_text, local_image_urls, image_files, new_post_tags } = this.state;
        console.log("new post tags: ", new_post_tags);
        if (new_post_text.trim() !== "") {
            // add images to database
            const image_urls = await addImage(image_files, this);

            // add the post to the database
            makePost(new_post_text, image_urls, new_post_tags);
            this.setState({
                req: "makePost",
                new_post_text: "",
                new_post_tags: [],
                new_post_img: "",
                local_image_urls: [],
                image_files: [],
            });
        }
    }

    addTag(e) {
        if (
            this.state.new_tag !== "" &&
            !this.state.new_post_tags.includes(this.state.new_tag)
        ) {
            this.setState({
                new_post_tags: this.state.new_post_tags.concat([
                    this.state.new_tag,
                ]),
                new_tag: "",
            });
        }
    }

    handleDeleteTag(tag) {
        console.log(`Deleting tag: ${tag}`);
        this.setState({
            new_post_tags: this.state.new_post_tags.filter(function (value) {
                return value !== tag;
            }),
        });
    }

    uploadFile(event) {
        if (this.state.local_image_urls.length < MAX_POSTS) {
            const fileUploaded = event.target.files[0];

            const image_files = this.state.image_files.concat([fileUploaded]);
            console.log("image files: ", image_files);

            const local_image_urls = this.state.local_image_urls.concat([URL.createObjectURL(fileUploaded)]);
            console.log("image urls: ", local_image_urls)

            this.setState({ local_image_urls: local_image_urls, image_files: image_files });
        } else {
            // need to tell user that max upload limit has been reached
            console.log(`MAX UPLOAD LIMIT (${MAX_POSTS}) CANNOT BE EXCEEDED`);
        }
        event.target.value = null;
        
    };

    handleClick() {
        hiddenFileInput.current.click();
    };

    render() {
        const images = this.state.local_image_urls.map((image_files) => {
            return (
                <div>
                    <img 
                        className="image-container" 
                        src={image_files} 
                        alt="">
                   </img>
                </div>
            )
        });

        return (
            <div className="myblog-container">
                <div>
                    <Navbar
                        app={this.props.app}
                        view="myblog"
                        currentUser={this.state.currentUser}

                    // view="myBlog"
                    // current_user={this.state.current_username}
                    // current_user_role={this.state.current_user_role}
                    // profileImg={this.state.profileImg}
                    />
                </div>
                <div className="blog-middle-area">
                    <div className="make-a-post-container">
                        <div>
                            {/* Server called needed here to display a preview of the image chosen by the user */}                    
                            <TextField
                                className="make-a-post-text"
                                variant="outlined"
                                label="write about your post"
                                value={this.state.new_post_text}
                                multiline
                                onChange={(e) => {
                                    this.setState({
                                        new_post_text: e.target.value,
                                    });
                                }}
                            />
                            <div style={{display: "flex"}}>
                                {images}
                            </div>
                        </div>

                        <div className="post-options">
                            <div className="tagsContainer">
                                Current Tags:{" "}
                                {this.state.new_post_tags.map((tag) => {
                                    return (
                                        <Chip
                                            className="tag"
                                            key={uid(tag)}
                                            size="small"
                                            label={tag}
                                            onDelete={() =>
                                                this.handleDeleteTag(tag)
                                            }
                                        />
                                    );
                                })}
                            </div>

                            <TextField
                                className="new-tag-text"
                                variant="outlined"
                                label="Add a tag to your post"
                                value={this.state.new_tag}
                                onChange={(e) => {
                                    this.setState({ new_tag: e.target.value });
                                }}
                                onKeyPress={(ev) => {
                                    if (ev.key === "Enter") {
                                        ev.preventDefault();
                                        this.addTag();
                                    }
                                }}
                            />

                            <IconButton
                                id="add-tag-button"
                                onClick={(e) => this.addTag(e)}
                            >
                                <AddCircleIcon />
                            </IconButton>

                            
                            <IconButton
                                id="attach-button"
                                onClick={() => this.handleClick()}
                            >
                                <InsertPhotoIcon />
                            </IconButton>
                            <input 
                                name="image" 
                                ref={hiddenFileInput}
                                onChange={(e) => this.uploadFile(e)}
                                type="file" 
                                style={{display: 'none'}}
                            />
                            <Button
                                id="post-button"
                                size="small"
                                onClick={(e) => this.makePostButtonPress(e)}
                            >
                                POST
                            </Button>
                        </div>
                    </div>

                    {/* map posts  */}
                    <div className="post-area">
                        <PostList
                            currentUser={this.state.currentUser}
                            type={this.state.req}
                            myBlog={this}
                            profileImg={this.state.profileImg}
                            page={this}
                            role={this.state.current_user_role}
                            searchText={this.searchText}
                        // addComment={this.addComment}
                        // current_username={this.state.current_username}
                        //app_users={this.state.app_users}
                        // posts={this.state.posts}
                        />
                    </div>
                </div>
                <div>
                    <PermanentDrawerRight
                        app={this.props.app}
                        page={this}
                    // following={this.state.following}
                    // followers={this.state.followers}
                    />
                </div>
            </div>
        );
    }
}

export default MyBlog;
