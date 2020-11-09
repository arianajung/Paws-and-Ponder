import getCurrentUserAndIndex from "../actions/getCurrentUserAndIndex"

export const handleProfileBtn = (app, username, profile) => {
    app.setState({
        profile_username: username,
    });

    const { users } = app.state;

    const [profile_user_index, profile_user] = getCurrentUserAndIndex(
        users,
        username
    )

    profile.setState({
        profile_user_index: profile_user_index,
        profile_username: profile_user.username,
        profile_user_role: profile_user.role,
        profile_profileImg: profile_user.profileImg,
        posts: profile_user.userPosts,
        all_posts: profile_user.userPosts
    })
};