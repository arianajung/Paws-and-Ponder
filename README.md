

# team33

# List of Framework/Libraries
 - React
 - Material UI
 
## Note

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
	- Search bar feature?
-   Admin View and functionalities
-   (Only if we have time) Notifications
-   ~~Allow user-upload avatar pictures~~  Provide 3(?) hardcoded images for users to select from for their avatar
-   Keep in mind where a RESTful API call will be established to our backend as developing, prepare the correct states/hooks for sending/receiving these data if possible.
---
Additional Features:
- Direct messaging
- Mentioning another user (using @) on posts and/or comments
- Reporting other users’ malicious posts/comments

## Questions for our TA:
- Styling requirements for Material UI components?
- FindDOMNode warning brought by React Transition + Material UI
- Clarification on what needs to be done by the Phase 1 deadline.
  - Is it required to create views for different users with almost identical content but differ in posts/followers/statistics?
  - Do we need to include the states for a Component and RESTful function headers that may be needed for our backend in our codebase?
  - If we are adding/removing functionalities from our proposal, how should we inform the instructors?
  - For Phase 1, is the weight heavier on more aesthetic visuals or user interactions within a page?
