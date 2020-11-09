

# Petlog team33 

## List of Framework/Libraries used in our application
 - React
 - Material UI

## Usage and instructions for our application

### To run our application, please clone our master branch, navigate into /petlog, and install the dependencies
```bash
git clone https://github.com/csc309-fall-2020/team33.git
git checkout master
cd /petlog
npm install
npm start
```

### Explanation and guide to our features:
### User

Please enter the information below and press the login button to log in as a regular user:

**Username**: user

**Password**: user

Functionalities walkthrough:

1. **Main Page**: 

	In this view, as a user, you can:
- Interact with the navigation bar displayed on the left, which takes you to different views. (**->Main, My Blog, Bookmarks, Settings, Log In Page**)

- View all the posts made by the users that you follow in the middle. You may like, bookmark, or comment on each post. Clicking on the avatar of a post or comment brings you to the profile page of that user. (**->Profile**)

- Bookmark a post by pressing the bookmark button on the top right of each post, and it will be added to your Bookmarks view (**->Bookmarks**). 

- You can make a new comment by typing in the comment text field under each post and pressing the comment button. You can also delete a comment that you've made by pressing the remove button on the right side of your comment.

- Search by tags or usernames with the search bar displayed on the top. The search is not case-sensitive and will return all posts from the current view that matches the username or tag. You may only search for one tag/username at a time. To display all existing posts from this view again, search with an empty string.

- View all your followers and the users that you are following on the right. Clicking on an avatar brings you to that user's profile page. (**->Profile**)

2. **My Blog**: 

	This view contains all of the user's own posts and shares some similarities with the Main view in terms of functionalities:

- The Navigation Bar, the search bar, and the Followers/Following Section work the same as in Main.

- For the post section, in addition to commenting, you can also delete any comments made by other users. You can also delete your post by pressing the delete button on the top right of each post.

- You can make a new post by typing in the post textbox on top of the page. You may add custom tags by typing in the tag text field and pressing the "add button" or the "enter key". These tags will respond to the searches made by the search bar within this view. You may delete an added tag by pressing the delete icon on each of the new tag before making your post. Pressing the image icon will insert a hardcoded image into your post, this will be generalized to custom images uploaded by the user in phase 2. Finally, you may press the POST button to create your new post.

3. **Bookmarks**: 

	This view works very similarly to the Main view, except it only displays the blogs that you've bookmarked. The navigation bar, the search bar, and the Followers/Following Section work the same as in Main. You can also interact with each post the same way as you would in Main. You may click on the bookmark button on the top right of each post to un-bookmark a post.

4. **Profile**: 

	This view also works the same as the Main View, with a few differences:
- It only displays posts made by this specific user

- You may follow or unfollow this user by clicking on the button displayed below the avatar in the navigation bar. Doing so will add/remove this user from your following list on the right.

5. **Settings**: 

	This view contains the frontend for various settings and customization that we wish to implement in our phase 2.
- **Note that it outputs "Warning: findDOMNode is deprecated in StrictMode" when expanding an Accordion, this is because the latest version of MaterialUI is making a browser API call that is deprecated in strict mode, which we cannot handle easily**

- Expand each accordion to see which settings we wish to implement for a user, each of these will send an API request to the server to update specific information about the user in Phase 2.

- For now, the profile picture setting allows 3 hardcoded pictures for the user to select from, this is however not reflect in the user profile because we plan to make this change to the server later, same with the other settings.

- The tabs in the navigation bar on the left are intended to bring you to that specific section of settings, this is however not necessary for this stage of development, as we do not have enough settings to populate the view. You may still go back to the Main view or log on by pressing the corresponding buttons. (**->Main, Log In Page**)


### Admin

Please enter the information below and press the login button to log in as an Admin user:

**Username**: admin

**Password**: admin

Functionalities walkthrough:

- An admin user retains all of the features that a regular user have access to, with a few additions:

- In addition to like to bookmark a post, the admin user can delete any post made by any user. This includes the posts that are displayed in the admin's main view, and any posts accessible through a user's profile page. This is done by clicking on the menu button beside the post and clicking on the delete tab.

- Similar to delete a post, the admin user can also delete any comments made by any user for a given post. The process is the same as deleting a post but with a comment.

- The admin user can choose to Ban a user from a post or a comment. This can be done by clicking on the menu button beside the post or comment made by a user and clicking on the "Ban User" option. This will prevent that user from logging in, but that user's posts and profile page will still be accessible by other users.

## Thank you and we hope you enjoyed trying out our application!

---

## Development Notes for Team members

- Remember to always navigate into /petlog and run the following code to update the dependencies before developing.
  ```bash
  git checkout dev
  npm install
  ```

- Always add and commit package.json.
- Do not add or commit node_modules/ or package-lock.json

## TODO:

Phase 1: (Ordered by Priority)
-   ~~Add functionality to make Post for a user~~
-   ~~Ability to add pictures to a post~~
-   ~~Deleting a post for a user~~
	- ~~Fix problem with CSS styling that occurs when all posts from MyBlog are removed~~
-   ~~Like/Bookmark Buttons for a post~~
-   ~~View for bookmarked posts~~
-   ~~Tags for posts to enable search bar(?)~~
	- ~~Search bar feature?~~
-   ~~Admin View and functionalities~~
-   ~~Provide 3(?) hardcoded images for users to select from for their avatar~~

Keep in mind where a RESTful API call will be established to our backend as developing, prepare the correct states/hooks for sending/receiving these data if possible.

---
Additional Features:
- Direct messaging
- Mentioning another user (using @) on posts and/or comments
- Reporting other users’ malicious posts/comments

## Questions for our TA: (For Phase 1 Meeting)
- Styling requirements for Material UI components?
- FindDOMNode warning brought by React Transition + Material UI
- Clarification on what needs to be done by the Phase 1 deadline.
  - Is it required to create views for different users with almost identical content but differ in posts/followers/statistics?
  - Do we need to include the states for a Component and RESTful function headers that may be needed for our backend in our codebase?
  - If we are adding/removing functionalities from our proposal, how should we inform the instructors?
  - For Phase 1, is the weight heavier on more aesthetic visuals or user interactions within a page?
