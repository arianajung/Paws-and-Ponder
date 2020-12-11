// Functions to help with users

export const updatePassword = async (password) => {
    const url = `/api/updatePassword`;

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify({
            password: password,
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
    });

    return fetch(request)
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                console.log("Password updated successfully");
                return true;
            }
        })
        .catch((error) => {
            console.log("Failed to update password.");
            return false;
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
                alert("Could not get current user info");
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
                alert("Could not get current user info");
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
