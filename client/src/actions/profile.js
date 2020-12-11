import getCurrentUserAndIndex from "./getCurrentUserAndIndex";
import Profile from "../react-components/Profile/Profile";
import { updateUserRelation } from "./users";

export const handleProfileBtn = (app, user, page) => {
    app.setState({
        profileUser: user,
    });

    if (page instanceof Profile) {
        page.setState({
            profileUser: user,
            // posts: profile_user.userPosts,
            // profile_username: profile_user.username,
            // profile_user_role: profile_user.role,
            // profile_profileImg: profile_user.profileImg,
            // profile_followers: profile_user.followers,
            // all_posts: profile_user.userPosts
        });
    }
};

export const contains = (_id, following) => {
    for (let i = 0; i < following.length; i++) {
        if (following[i] === _id) {
            return true;
        }
    }
    return false;
};

export const handleFollowButton = (profileUser, profilePage) => {
    console.log("here", profileUser);
    const profileUser_id = profileUser._id;
    updateUserRelation(profilePage, profileUser_id);
};

// export const handleFollowBtn = (profilePage, profileUser, currentUser) => {
//     const currentUser_id = currentUser._id
//     const profileUser_id = profileUser._id
//     const currentUserFollowingList = currentUser.following
//     const profileUserFollowersList = profileUser.follower

//     // patch user's following list
//     // patch profile's followers list
//     // update profile user and current user object in drawer and profile page in state, maybe navbar
//     if (contains(profileUser_id, currentUserFollowingList)) {

//         const filteredFollowing = currentUserFollowingList.filter((_id) => {
//             return _id !== profileUser_id
//         })
//         const filteredFollowers = profileUserFollowersList.filter((_id) => {
//             return _id !== currentUser_id
//         })

//         patchFollowing(profilePage, filteredFollowing)
//         patchFollowers(profilePage, profileUser_id, filteredFollowers)

//         // let newUsers = app_users.slice();

//         // const [viewing_user_index, viewing_user] = getCurrentUserAndIndex(
//         //     app_users,
//         //     viewing_username
//         // );

//         // viewing_user.following = filteredFollowing;
//         // newUsers.splice(viewing_user_index, 1, viewing_user);

//         // const [current_user_index, current_user] = getCurrentUserAndIndex(
//         //     app_users,
//         //     current_username
//         // );

//         // current_user.followers = filteredFollowers;
//         // newUsers.splice(current_user_index, 1, current_user);

//         // profile.setState({
//         //     following: filteredFollowing,
//         //     profile_followers: filteredFollowers
//         // })
//     } else {
//         currentUserFollowingList.push(profileUser_id)
//         profileUserFollowersList.push(currentUser_id)

//         patchFollowing(profilePage, currentUserFollowingList)
//         patchFollowers(profilePage, profileUser_id, profileUserFollowersList)

//         // following.push(current_username)
//         // profile_followers.push(viewing_username)

//         // profile.setState({
//         //     following: following,
//         //     profile_followers: profile_followers
//         // })
//     }
// }
