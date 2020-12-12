// Functions to help with user actions.

export const getPosts = async (postList) => {
    const url = `/api/get-main-posts/`;

    await fetch(url, {
        accepts: "application/json",
    })
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get main posts");
            }
        })
        .then((json) => {
            // the resolved promise with the JSON body
            postList.setState({ postList: json.posts });
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getFollowers = (set) => {
    // the URL for the request
    const url = "/api/followers";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get user followers");
            }
        })
        .then((json) => {
            // the resolved promise with the JSON body
            set(json);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getFollowing = (set) => {
    // the URL for the request
    const url = "/api/following";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get following users");
            }
        })
        .then((json) => {
            // the resolved promise with the JSON body
            set(json);
        })
        .catch((error) => {
            console.log(error);
        });
};

// A function to send a GET request to the web server
export const getCurrentUser = (page) => {
    // the URL for the request
    const url = "/api/user";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get current user info");
            }
        })
        .then((json) => {
            // the resolved promise with the JSON body
            page.setState({ currentUser: json });
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getSpecificUser = (page, postUser_id) => {
    // the URL for the request
    const url = `/api/user/${postUser_id}`;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get current user info");
            }
        })
        .then((json) => {
            // the resolved promise with the JSON body
            page.setState({ specificUser: json });
        })
        .catch((error) => {
            console.log(error);
        });
};

// Used when follow/unfollow a user on a profile page
export const updateUserRelation = (page, profile_id) => {
    // the URL for the request
    const url = `/api/updateUserRelation?profile_id=${profile_id}`;
    const request = new Request(url, {
        method: "PATCH",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });

    // Since this is a GET request, simply call fetch on the URL
    fetch(request)
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log(
                    "Follow/Unfollow Failed, check that your session is still running"
                );
            }
        })
        .then((json) => {
            // the resolved promise with the JSON body
            page.setState({ currentUser: json.curr_user });
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getUserPosts = (postList) => {
    const url = `/api/getUserPosts/`;

    fetch(url, {
        accepts: "application/json",
    })
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get user my-blog posts");
            }
        })
        .then((json) => {
            // the resolved promise with the JSON body
            postList.setState({ postList: json.posts });
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getProfilePosts = (postList) => {
    const url = `/api/getProfilePosts?username=${postList.state.currentuser}`;

    fetch(url, {
        accepts: "application/json",
    })
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get user profile posts");
            }
        })
        .then((json) => {
            // the resolved promise with the JSON body
            postList.setState({ postList: json.posts });
        })
        .catch((error) => {
            console.log(error);
        });
};

export const addComment = async (new_comment, pid, postlist) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/api/addComment", {
        method: "post",
        body: JSON.stringify({
            textContent: new_comment,
            post_id: pid,
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });

    // Send the request with fetch()
    await fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            // the resolved promise with the JSON body
            if (postlist.state.type === "main") {
                if (postlist.props.type === "searched") {
                    getSearchedPosts(
                        postlist,
                        postlist.props.search_text,
                        postlist.props.page
                    );
                } else {
                    getPosts(postlist);
                }
            } else if (postlist.state.type === "profile") {
                getProfilePosts(postlist);
            } else if (postlist.state.type === "bookmarks") {
                getBookmarkPosts(postlist);
            } else {
                getUserPosts(postlist);
            }
        })
        .catch((error) => {
            console.log(error);
            console.log("Failed to add comment");
        });
};

export const makePost = async (new_post, images, tags) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/api/makePost", {
        method: "post",
        body: JSON.stringify({
            textContent: new_post,
            images: images,
            tags: tags,
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });
    // Send the request with fetch()
    await fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            console.log(
                "correctly fetched MyBlog makePost result from database"
            );
        })
        .catch((error) => {
            console.log(error);
            console.log("Failed to make post");
        });
};

export const removePost = async (postID, postList) => {
    const url = `/api/removePost/${postID}`;
    const request = new Request(url, {
        method: "delete",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });
    // Send the request with fetch()
    await fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            console.log("correctly deleted post from database");
            // probably will have to distinguish if it's a req from user vs. admin later
            // including types of post list becase an admin can delete from different pages
            if (postList.state.type === "main") {
                if (postList.props.type === "searched") {
                    getSearchedPosts(
                        postList,
                        postList.props.search_text,
                        postList.props.page
                    );
                } else {
                    getPosts(postList);
                }
            } else if (postList.state.type === "profile") {
                getProfilePosts(postList);
            } else {
                getUserPosts(postList);
            }
        })
        .catch((error) => {
            console.log(error);
            console.log("Failed to remove post from database");
        });
};

export const removeComment = async (postID, commentID, postList) => {
    const url = `/api/removeComment/${postID}/${commentID}`;
    const request = new Request(url, {
        method: "delete",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });
    // Send the request with fetch()
    await fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            // probably will have to distinguish if it's a req from user vs. admin later
            if (postList.state.type === "main") {
                if (postList.props.type === "searched") {
                    getSearchedPosts(
                        postList,
                        postList.props.search_text,
                        postList.props.page
                    );
                } else {
                    getPosts(postList);
                }
            } else if (postList.state.type === "profile") {
                getProfilePosts(postList);
            } else if (postList.state.type === "bookmarks") {
                getBookmarkPosts(postList);
            } else {
                getUserPosts(postList);
            }
            console.log("removed from database");
        })
        .catch((error) => {
            console.log(error);
            console.log("Failed to remove comment from database");
        });
};

export const getSearchedPosts = async (postlist, search_text, mainpage) => {
    const url = `/api/getSearchedPost?search_text=${search_text}`;
    fetch(url, {
        accepts: "application/json",
    })
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Search failed");
            }
        })
        .then((json) => {
            // the resolved promise with the JSON body
            console.log("Successfully Retrieved Searched posts");
            postlist.setState({ postList: json.posts });
            mainpage.setState({ type: "searched" });
        })
        .catch((error) => {
            console.log(error);
        });
};

export const bookmarkPost = async (postID) => {
    const url = `/api/bookmarkPost/${postID}`;

    const request = new Request(url, {
        method: "post",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });

    // Send the request with fetch()
    await fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            console.log(
                "Added the post in the bookmarks array in the database."
            );
        })
        .catch((error) => {
            console.log(error);
            console.log("Failed to make post");
        });
};

export const unbookmarkPost = async (postID, postlist) => {
    const url = `/api/unbookmarkPost/${postID}`;

    const request = new Request(url, {
        method: "delete",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });

    // Send the request with fetch()
    await fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then((json) => {
            console.log(
                "Deleted the post from the bookmarks array in the database."
            );
            if (postlist.state.type === "bookmarks") {
                getBookmarkPosts(postlist);
            }
        })
        .catch((error) => {
            console.log(error);
            console.log("Failed to make post");
        });
};

export const getBookmarkPosts = async (postList) => {
    const url = `/api/getBookmarkPosts`;

    fetch(url, {
        accepts: "application/json",
    })
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get bookmarked posts");
            }
        })
        .then((json) => {
            // the resolved promise with the JSON body
            postList.setState({ postList: json });
        })
        .catch((error) => {
            console.log(error);
        });
};
