// Functions to help with user actions.

export const getPosts = (postList) => {
    const url = `/api/get-main-posts/`;

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

export const getFollowers = (set) => {
    // the URL for the request
    const url = "/api/followers";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get the followers");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            set(json);
        })
        .catch(error => {
            console.log(error);
        });
}

export const getFollowing = (set) => {
    // the URL for the request
    const url = "/api/following";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get the following");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            set(json);
        })
        .catch(error => {
            console.log(error);
        });
}

// A function to send a GET request to the web server
export const getCurrentUser = (page) => {
    // the URL for the request
    const url = "/api/user";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get the user");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            page.setState({ currentUser: json });
        })
        .catch(error => {
            console.log(error);
        });
};

// for profile user's followrers
export const patchFollowers = (page, id, followers) => {
    // the URL for the request
    const url = `/api/followers/${id}`;

    const request = new Request(url, {
        method: "patch",
        body: JSON.stringify({follower: followers}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Since this is a GET request, simply call fetch on the URL
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not patch the followers");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            page.setState({profileUser: json})
        })
        .catch(error => {
            console.log(error);
        });
}

// need to change this without id, use session
export const patchFollowing = (page, following) => {
    // the URL for the request
    const url = "/api/following";

    const request = new Request(url, {
        method: "patch",
        body: JSON.stringify({following: following}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Since this is a GET request, simply call fetch on the URL
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not patch the following");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            page.setState({currentUser: json})
        })
        .catch(error => {
            console.log(error);
        });
}