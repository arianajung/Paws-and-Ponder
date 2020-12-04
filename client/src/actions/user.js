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
    const url = `/api/getProfilePosts?username=${postList.state.currentUser}`;

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

export const addComment = async (new_comment, pid, postlist) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/api/addComment", {
        method: "post",
        body: JSON.stringify({
            textContent: new_comment,
            post_id: pid
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    await fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then((json) => {
            // the resolved promise with the JSON body
            if (postlist.state.type === "main") {
                getPosts(postlist);
            } else if (postlist.state.type === "profile") {
                getProfilePosts(postlist);
            } else {
                getUserPosts(postlist);
            }
        })
        .catch(error => {
            console.log(error);
            console.log("Failed to add comment");
        });
};