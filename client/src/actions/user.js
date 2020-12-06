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
                alert("Could not get posts");
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
                alert("Could not get the followers");
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
                alert("Could not get the following");
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
                alert("Could not get the user");
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

// Used when follow/unfollow a user on a profile page
export const updateUserRelation = (page, profile_id) => {
    // the URL for the request
    const url = `/api/updateUserRelation?profile_id=${profile_id}`;

    console.log(url);

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
                alert(
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

// for profile user's followrers
// export const patchFollowers = (page, id, followers) => {
//     // the URL for the request
//     const url = `/api/followers/${id}`;

//     const request = new Request(url, {
//         method: "patch",
//         body: JSON.stringify({follower: followers}),
//         headers: {
//             Accept: "application/json, text/plain, */*",
//             "Content-Type": "application/json"
//         }
//     });

//     // Since this is a GET request, simply call fetch on the URL
//     fetch(request)
//         .then(res => {
//             if (res.status === 200) {
//                 // return a promise that resolves with the JSON body
//                 return res.json();
//             } else {
//                 alert("Could not patch the followers");
//             }
//         })
//         .then(json => {
//             // the resolved promise with the JSON body
//             page.setState({profileUser: json})
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

// // need to change this without id, use session
// export const patchFollowing = (page, following) => {
//     // the URL for the request
//     const url = "/api/following";

//     const request = new Request(url, {
//         method: "patch",
//         body: JSON.stringify({following: following}),
//         headers: {
//             Accept: "application/json, text/plain, */*",
//             "Content-Type": "application/json"
//         }
//     });

//     // Since this is a GET request, simply call fetch on the URL
//     fetch(request)
//         .then(res => {
//             if (res.status === 200) {
//                 // return a promise that resolves with the JSON body
//                 return res.json();
//             } else {
//                 alert("Could not patch the following");
//             }
//         })
//         .then(json => {
//             // the resolved promise with the JSON body
//             page.setState({currentUser: json})
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

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
                alert("Could not get posts");
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
                alert("Could not get posts");
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
                getPosts(postlist);
            } else if (postlist.state.type === "profile") {
                getProfilePosts(postlist);
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
            getUserPosts(postList);
        })
        .catch((error) => {
            console.log(error);
            console.log("Failed to remove post from database");
        });
};
