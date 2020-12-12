// Comments fetch calls

import { getBookmarkPosts } from "../actions/bookmarks";
import {
    getPosts,
    getSearchedPosts,
    getProfilePosts,
    getUserPosts,
} from "../actions/posts";

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
            console.log("Failed to add comment");
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
            console.log("Failed to remove comment from database");
        });
};
