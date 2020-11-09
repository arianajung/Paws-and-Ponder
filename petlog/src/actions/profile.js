import getCurrentUserAndIndex from "./getCurrentUserAndIndex"
import Profile from "../Profile/Profile"

export const handleProfileBtn = (app, username, page) => {
    app.setState({
        profile_username: username,
    });

    if (page instanceof Profile) {
        const { users } = app.state;

        const profile_user = getCurrentUserAndIndex(users, username)[1]
        page.setState({
            posts: profile_user.userPosts,
            profile_username: profile_user.username,
            profile_user_role: profile_user.role,
            profile_profileImg: profile_user.profileImg,
            profile_followers: profile_user.followers,
            all_posts: profile_user.userPosts
        })
    }
};

export const contains = (current_username, following) => {
    for (let i = 0; i < following.length; i++) {
        if (following[i] === current_username) {
            return true
        }
    }
    return false
}

export const handleFollowBtn = (app_users, viewing_username, current_username, following, profile_followers, profile) => {
    if (contains(current_username, following)) {
        const filteredFollowing = following.filter((username) => {
            return username !== current_username
        })
        const filteredFollowers = profile_followers.filter((username) => {
            return username !== viewing_username
        })

        let newUsers = app_users.slice();

        const [viewing_user_index, viewing_user] = getCurrentUserAndIndex(
            app_users,
            viewing_username
        );

        viewing_user.following = filteredFollowing;
        newUsers.splice(viewing_user_index, 1, viewing_user);

        const [current_user_index, current_user] = getCurrentUserAndIndex(
            app_users,
            current_username
        );

        current_user.followers = filteredFollowers;
        newUsers.splice(current_user_index, 1, current_user);

        profile.setState({
            following: filteredFollowing,
            profile_followers: filteredFollowers
        })
    } else {
        following.push(current_username)
        profile_followers.push(viewing_username)

        profile.setState({
            following: following,
            profile_followers: profile_followers
        })
    }
}