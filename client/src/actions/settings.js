export const getUserStatistics = async () => {
    return fetch('/api/getUserStats')
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch((error) => {
            console.log("settings: getUserStats, ", error);
            return null;
        });
}

export const updateBio = async (data) => {
    const url = '/api/changeUserBio';
    const request = new Request(url, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return true;
            }
        })
        .catch((error) => {
            console.log("settings: updateBio, ", error);
            return false;
        });
}

export const updateUsername = async (data) => {
    const url = '/api/changeUsername';
    const request = new Request(url, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return true;
            }
        })
        .catch((error) => {
            console.log("settings: updateUsername, ", error);
            return false
        })
}

export const updatePassword = async (password) => {
    const url = `/api/updatePassword`;

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify({
            password: password
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
                console.log("Password updated successfully")
                return true;
            }
        })
        .catch((error) => {
            console.log("Failed to update password.");
            return false;
        });
};