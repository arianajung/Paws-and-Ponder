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
  * [Image API Routes](#image-api-routes)
  * [Regular User Routes](#regular-user-routes)
  * [Admin Routes](#admin-routes)


## Deployed Website
[link](link)

## List of Framework and Libraries used in our application
 - React
 - Material UI

## Usage and instructions for our application

### Explanation and guide to our features:
### User

After reaching the landing page, you may log in with the credentials below:

**Username**: encrypt (change this)

**Password**: 1234

Alternatively, you may sign up with a new user by going though the sign up page.

Functionalities walkthrough: Notable differences from Phase 1 are emphasised with **bolded** text.

1. **Main Page**: 

	In this view, as a regular user, you can:
	- Interact with the navigation bar displayed on the left, which takes you to different views. (**->Main, My Blog, Bookmarks, Settings, Log In Page**)

	- View all the posts made by the users that you follow in the middle. You may bookmark or comment on each post. Clicking on the avatar of a post or comment brings you to the profile page of that user. (**->Profile**)

	- Bookmark a post by pressing the bookmark button on the top right of each post, **you will be alerted whether you have bookmarked or unbookmarked the post**, and it will be added or removed from your Bookmarks view accordingly. (**->Bookmarks**). 

	- You can make a new comment by typing in the comment text field under each post and pressing the comment button. You can also delete a comment that you've made by pressing the remove button on the right side of your comment.

	- Search by tags or usernames with the search bar displayed on the top. The search is NOT case-sensitive and will return **all posts from the entire Post collection in the database that contains the searched text as a _substring_ in the username or tag**. You may only search for one tag/username at a time. To display all existing posts from this view again, search with an empty string, or click on the "X" button at the right side of the search bar.
	
	**- Clicking on a tag in a post will act like searching for that specific tag.**

	- View all your followers and the users that you are following on the right. Clicking on an avatar brings you to that user's profile page. (**->Profile**)

2. **My Blog**: 

	This view contains all of the user's own posts and shares some similarities with the Main view in terms of functionalities:

	- The Navigation Bar, and the Followers/Following Section work the same as in Main.

	- For the post section, in addition to commenting, you can also delete any comments made by other users. You can also delete your post by pressing the delete button on the top right of each post.

	- You can make a new post by typing in the post textbox on top of the page. You may add custom tags by typing in the tag text field and pressing the "add button" or the "enter key". These tags will respond to the searches when another user search by the tag content. You may delete an added tag by pressing the delete icon on each of the new tag before making your post. Pressing the image icon will **prompt the user to insert an image for this post. The user may insert up to for images for each posts**. Finally, you may press the POST button to create your new post.

3. **Bookmarks**: 

	This view works very similarly to the Main view, except it only displays the blogs that you've bookmarked. The navigation bar, and the Followers/Following Section work the same as in Main. You can also interact with each post the same way as you would in Main. You may click on the bookmark button on the top right of each post to un-bookmark a post.

4. **Profile**: 

	This view also works the same as the Main View, with a few differences:
	- It only displays posts made by this specific user

	- You may follow or unfollow this user by clicking on the button displayed below the avatar in the navigation bar. Doing so will add/remove this user from your following list on the right.

5. **Settings**: 

	This view contains the frontend for various settings and customization for a user.
	- **Note that it outputs "Warning: findDOMNode is deprecated in StrictMode" when expanding an Accordion, this is because the latest version of MaterialUI is making a browser API call that is deprecated in strict mode, which we cannot handle easily**

	- Expand each accordion to see which settings we wish to implement for a user, each of these will send an API request to the server to update specific information about the user.

	- The profile picture setting allows 3 hardcoded pictures for the user to select from, **you may also upload a picture of your own to set as your profile avatar.**

---


### Admin

Please enter the information below and press the login button to log in as an Admin user:

**Username**: admin (Need to set up a good admin user)

**Password**: admin

Functionalities walkthrough:

- An admin user retains all of the features that a regular user have access to, with a few additions:

- In addition to bookmark a post, the admin user can delete any post made by any user. This includes the posts that are displayed in the admin's main view, and any posts accessible through a user's profile page. This is done by clicking on the menu button beside the post and clicking on the delete tab.

- Similar to delete a post, the admin user can also delete any comments made by any user for a given post. The process is the same as deleting a post but with a comment.

- The admin user can choose to Ban **and Unban** a user from a post or a comment. This can be done by clicking on the menu button beside the post or comment made by a user and clicking on the "Ban User" option. This will prevent that user from logging in, but that user's posts and profile page will still be accessible by other users.

## Documentations For Our Express Routes
### Middlewares 

**Explain the purpose for each middleware**

mongoChecker

authenticate

isAdmin

multipartMiddleware

### Session Handling

```javascript
app.post("/users/login")
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.get("/users/logout")
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.get("/users/check-session")
```
Purpose/Usage:

Data Expected:

Data Returned:


### Image API Routes
```javascript
app.post("/images", multipartMiddleware, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.get("/images", ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.delete("/images/:imageId", ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

### Regular User Routes
```javascript
app.post("/api/addUser", mongoChecker, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.post("/api/addComment", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.get("/api/getUserPosts", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.get("/api/getProfilePosts", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.get("/api/get-main-posts/", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.get("/api/getSearchedPost", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.get("/api/followers", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.get("/api/following", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.get("/api/user", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.get("/api/user/:id", mongoChecker, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.patch("/api/updateUserRelation", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.post("/api/makePost", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.delete("/api/removePost/:postID", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.delete("/api/removeComment/:postID/:commentID", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.post("/api/bookmarkPost/:postID", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.delete("/api/unbookmarkPost/:postID", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:

```javascript
app.get("/api/getBookmarkPosts", mongoChecker, authenticate, ...)
```
Purpose/Usage:

Data Expected:

Data Returned:


### Admin Routes
```javascript
app.patch("/api/admin/toggleBanStatus/:user_id", mongoChecker, authenticate, isAdmin, ...)
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
