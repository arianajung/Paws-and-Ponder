// Bookmark fetch calls

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
                alert("Could not get bookmarked posts");
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
