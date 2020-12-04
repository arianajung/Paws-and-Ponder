import { getPosts, getUserPosts } from "./user";
// Functions to help with user actions.

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
                getPosts(this);
            } else {
                getUserPosts(this);
            }
        })
        .catch(error => {
            console.log(error);
            console.log("Failed to add comment");
        });
};