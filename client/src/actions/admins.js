// ========================== Admin Fetch calls =======================

export const toggleBanStatus = (user_id) => {
    // the URL for the request
    const url = `/api/admin/toggleBanStatus/${user_id}`;

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
                    "Ban/Unban Failed, check that your session is still running"
                );
            }
        })
        .then((json) => {
            // the resolved promise with the JSON body
            console.log(json.message);
        })
        .catch((error) => {
            console.log("Failed to update ban status");
        });
};
