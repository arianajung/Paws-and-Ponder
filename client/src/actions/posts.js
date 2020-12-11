// Posts fetch calls

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
                alert("Could not get main posts");
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
                alert("Could not get user my-blog posts");
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
    // export const getProfilePosts = (postList, profile_username) => {
    //     const url = `/api/getProfilePosts?username=${profile_username}`;
    //     console.log(`/api/getProfilePosts?username=${profile_username}`)

    fetch(url, {
        accepts: "application/json",
    })
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get user profile posts");
            }
        })
        .then((json) => {
            // the resolved promise with the JSON body
            console.log("posts from user.js:" + json.posts);
            postList.setState({ postList: json.posts });
        })
        .catch((error) => {
            console.log(error);
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

export const getSearchedPosts = async (postlist, search_text, mainpage) => {
    const url = `/api/getSearchedPost?search_text=${search_text}`;
    // export const getProfilePosts = (postList, profile_username) => {
    //     const url = `/api/getProfilePosts?username=${profile_username}`;
    //     console.log(`/api/getProfilePosts?username=${profile_username}`)

    fetch(url, {
        accepts: "application/json",
    })
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Search failed");
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
