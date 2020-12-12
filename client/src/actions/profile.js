import Profile from "../react-components/Profile/Profile";
import { updateUserRelation } from "./users";

export const handleProfileBtn = (app, user, page) => {
    app.setState({
        profileUser: user,
    });

    if (page instanceof Profile) {
        page.setState({
            profileUser: user,
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
    const profileUser_id = profileUser._id;
    updateUserRelation(profilePage, profileUser_id);
};
