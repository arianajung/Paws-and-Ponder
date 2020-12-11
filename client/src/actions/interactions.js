// Interaction fetch calls

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
                alert("Could not get user followers");
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
                alert("Could not get following users");
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
