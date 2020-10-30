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
Phase 1:
- Add functionality to make Post for a user
- Like/Favourite Buttons for a post
- Ability to add pictures to a post
- Allow user-upload avatar pictures
- View for favourite/bookmarked posts
- Deleting a post for a user
- Notifications
- Admin View and functionalities
- Tags for posts to enable search bar(?)
- Keep in mind where a RESTful API call will be established to our backend as developing,
prepare the correct states/hooks for sending/receiving these data if possible.
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
