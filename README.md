# Petlog team33 

## Index
- [Deployed Website](#deployed-website)
- [List of Framework and Libraries used in our application](#list-of-framework-and-libraries-used-in-our-application)
- [Usage and instructions for our application](#usage-and-instructions-for-our-application)
  * [Explanation and guide to our features](#explanation-and-guide-to-our-features)
  * [User](#user)
  * [Admin](#admin)
- [Documentations For Our Express Routes](#documentations-for-our-express-routes)
  * [Middlewares](#middlewares)
  * [Session Handling](#session-handling)
  * [Admin](#Admin)
  * [Bookmarks](#bookmarks)
  * [Comments](#comments)
  * [Images](#images)
  * [Interactions](#Interactions)
  * [Posts](#Posts)
  * [Users](#Users)


## Deployed Website
[https://pawsandponder.herokuapp.com/](https://pawsandponder.herokuapp.com/)

## List of Core Framework and Libraries used in our application
 - Backend
   - Express
   - Cloudinary
   - MongoDB
   - Mongoose
 - Frontend
   - React
   - Material UI

## Usage and instructions for our application

### Explanation and guide to our features: Notable differences from Phase 1 are emphasised with **bolded** text.
### User

After reaching the landing page, you may log in with the credentials below:

**Username**: encrypt (change this)

**Password**: 1234

Alternatively, you may sign up with a new user by going though the sign up page.

Functionalities walkthrough:

1. **Main Page**: 

	In this view, as a regular user, you can:
	- Interact with the navigation bar displayed on the left, which takes you to different views. (**->Main, My Blog, Bookmarks, Settings, Log In Page**)

	- View all the posts made by the users that you follow in the middle. You may bookmark or comment on each post. Clicking on the avatar of a post or comment brings you to the profile page of that user. (**->Profile**)

	- Bookmark a post by pressing the bookmark button on the top right of each post. **A dialog will pop up, telling you whether you have bookmarked or unbookmarked the post**, and it will be added or removed from your Bookmarks view accordingly. (**->Bookmarks**). 

	- You can make a new comment by typing in the comment text field under each post and pressing the comment button. You can also delete a comment that you've made by pressing the remove button on the right side of your comment.

	- Search by tags or usernames with the search bar displayed on the top. The search is NOT case-sensitive and will return **all posts from the entire Post collection in the database that contains the searched text as a _substring_ in the username or tag**. You may only search for one tag/username at a time. To display all existing posts from this view again, search with an empty string, or click on the "X" button at the right side of the search bar.
	
	- **Clicking on a tag in a post will act like searching for that specific tag (as a substring).**
	
	- **As of Phase 2, the search bar only exists in the Main Blog, but you may still click on tags in other views to perform a search**

	- View all your followers and the users that you are following on the right. Clicking on an avatar brings you to that user's profile page. (**->Profile**)
	
	- **A newly signed up user will automatically have an Admin user in their following list. This is so that all new users have some posts and users to interact with in t heir main page. They can also search up new posts and users with the search bar, and of course they may unfollow the admin user if intended.**

2. **My Blog**: 

	This view contains all of the user's own posts and shares some similarities with the Main view in terms of functionalities:

	- The Navigation Bar, and the Followers/Following Section work the same as in Main.

	- For the post section, in addition to commenting, you can also delete any comments made by other users. You can also delete your post by pressing the delete button on the top right of each post.

	- You can make a new post by typing in the post textbox on top of the page. You may add custom tags by typing in the tag text field and pressing the "add button" or the "enter" key. These tags will respond to the searches when a user search by the tag content. You may delete an added tag by pressing the delete icon on each of the new tag before making your post. Pressing the image icon will **prompt the user to insert an image for this post from their file explorer. The user may insert up to four images for each posts**. Finally, you may press the POST button to create your new post.

3. **Bookmarks**: 

	This view works very similarly to the Main view, except it only displays the posts that you've bookmarked. The navigation bar, and the Followers/Following Section work the same as in Main. You can also interact with each post the same way as you would in Main. You may click on the bookmark button on the top right of each post to un-bookmark a post.

4. **Profile**: 

	This view also works the same as the Main View, with a few differences:
	- It only displays posts made by this specific user.

	- You may follow or unfollow this user by clicking on the button displayed below the avatar in the navigation menu. Doing so will add/remove this user from your following list on the right.

5. **Settings**: 

	This view contains the frontend for various settings and customization for a user.
	- **Note that it outputs "Warning: findDOMNode is deprecated in StrictMode" when expanding an Accordion, this is because the latest version of MaterialUI is making a browser API call that is deprecated in strict mode, which we cannot handle easily**

	- Expand each accordion to see which settings we wish to implement for a user.
	
	- **You may change your username, Bio, and password in the corresponding sections, and press the save button to update it.**

	- The profile picture setting allows 3 hardcoded pictures for the user to select from, **you may also upload a picture of your own to set as your profile avatar, which will be displayed as the fourth avatar. Select one of the four radio buttons and press save will update your user profile image**.
	
	- **All of the above changes are reflected in the posts/comments that you've made, as well as when another user vists your profile page.**

---


### Admin

Please enter the information below and press the login button to log in as an Admin user:

**Username**: admin

**Password**: admin

Functionalities walkthrough:

- An admin user retains all of the features that a regular user have access to, with a few additions:

- In addition to bookmark a post, the admin user can delete any post made by any user. This includes the posts that are displayed in the admin's main view, and any posts accessible through a user's profile page. This is done by clicking on the menu button beside the post and clicking on the delete tab.

- Similar to delete a post, the admin user can also delete any comments made by any user for a given post. The process is the same as deleting a post but with a comment.

- The admin user can choose to Ban **and Unban** a user from a post or a comment. This can be done by clicking on the menu button beside the post or comment made by a user and clicking on the "Ban User" option. This will prevent that user from logging in, but that user's posts and profile page will still be accessible by other users.

- **The Admin user will automatically be followed by newly created users, so that new users will be provided a more interactive, user-friendly landing page upon sign-up.**

## Documentations For Our Express Routes
### Middlewares 

**Explain the purpose for each middleware**

mongoChecker

authenticate

isAdmin

multipartMiddleware

---

### Session Handling

#### Check Session
```javascript
app.get("/users/check-session")
```
Purpose/Usage:

Data Expected:

Data Returned:

---

### Admin Routes
API routes exclusive to admin users

#### Toggle Ban Status
```javascript
app.patch("/api/admin/toggleBanStatus/:user_id", mongoChecker, authenticate, isAdmin, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

---

### Bookmarks
API routes for handling bookmarks

#### Bookmark Post
```javascript
router.post(
    "/api/bookmarkPost/:postID",
    mongoChecker,
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Unbookmark Post
```javascript
router.delete(
    "/api/unbookmarkPost/:postID",
    mongoChecker,
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Get Bookmark Posts
```javascript
router.get(
    "/api/getBookmarkPosts",
    mongoChecker,
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

---

### Comments
API routes for handling comments

#### Add Comment
```javascript
router.post("/api/addComment", 
    mongoChecker, 
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Remove Comment
```javascript
router.delete(
    "/api/removeComment/:postID/:commentID",
    mongoChecker,
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

---

### Images
API routes for handling images

#### Add Image(s)
```javascript
router.post("/images", 
    multipartMiddleware, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Change User Avatar
```javascript
router.post(
    "/api/changeUserAvatar",
    mongoChecker,
    authenticate,
    multipartMiddleware, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

---

### Interactions
API routes that handle follow/unfollow interations

#### Get Followers
```javascript
router.get("/api/followers", 
    mongoChecker, 
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Get Following
```javascript
router.get("/api/following", 
    mongoChecker, 
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Update User Relationship
```javascript
router.patch(
    "/api/updateUserRelation",
    mongoChecker,
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

---

### Posts
API routes that handle retrieving. creating, and deleting posts

#### Get User Posts
```javascript
router.get(
    "/api/getUserPosts",
    mongoChecker,
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Get Profile Posts
```javascript
router.get(
    "/api/getProfilePosts",
    mongoChecker,
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Get Main View Posts
```javascript
router.get(
    "/api/get-main-posts/",
    mongoChecker,
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Get Searched Posts
```javascript
router.get(
    "/api/getSearchedPost",
    mongoChecker,
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Make Post
```javascript
router.post("/api/makePost", 
    mongoChecker, 
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Remove Post
```javascript
router.delete(
    "/api/removePost/:postID",
    mongoChecker,
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

---

### Users
API routes that handle user login/logout, fetching and updating user information

#### User Login
```javascript
router.post("/users/login", ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### User logout
```javascript
router.get("/users/logout", ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Update User Password
```javascript
router.patch(
    "/api/updatePassword",
    mongoChecker,
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Create User
```javascript
router.post("/api/addUser", 
    mongoChecker, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Get User Info
```javascript
router.get("/api/user", 
    mongoChecker, 
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Get User By ID
```javascript
router.get("/api/user/:id", 
    mongoChecker, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

#### Update User Avatar By Link
```javascript
router.patch(
    "/api/updateProfileImgByLink",
    mongoChecker,
    authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

---

### To run our application locally (for development), please clone our master branch, navigate into team33, and install the dependencies for both server and the client and start each of them separatly.
```bash
git clone https://github.com/csc309-fall-2020/team33.git
git checkout master
npm install
npm start
```

``` 
# In another terminal
cd client
npm install
npm start
```

## Thank you and we hope you enjoyed trying out our application!
