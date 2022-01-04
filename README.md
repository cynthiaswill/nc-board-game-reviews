# NC Board Game Reviews

This is a **front end** API repo.

It is a social games content rating, and discussion website, mainly built with React.js.

A live version of this **front end** API is **hosted at**:

- https://61a49a9862b336e911f98195--quizzical-bohr-776a6e.netlify.app/

It works together along with the **back end API**, which available at:

- backend API:
  - https://github.com/cynthiaswill/NC_Games_Board
- backend hosted at:
  - https://nc-games-board.herokuapp.com/api/

NC Games has game reviews which are divided into categories. Each review has user curated ratings and can be voted using the API. Users can also add comments about an review.

#

## Specifications & requirements

- Tested minimum version of Node v16.13.1. It might not work on latest node version v17, please use v16 instead.
- Clone the entire repo into a local folder, type 'npm install' in terminal to install all dependencies before running the app.
- Type 'npm start' in terminal to start the app in browser.

```
$ git clone https://github.com/cynthiaswill/nc-board-game-reviews.git
$ cd nc-board-game-reviews
$ npm install
$ npm start
```

- Support all latest Chrome, Firefox and Safari browsers.
- Support both desktop and mobile browsers, such as iphone and android devices.

#

## Essential Routes

```
/                       Home
/reviews                Reviews
/reviews/:review_id     Review with Comments
/users                  Users list
/users/:username        User profile
/compose                Compose New Review
/error                  Error Page
```

## User Stories

**As a user, I am able to...**

1. view a list of all reviews
2. view a page for each category with a list of related reviews.
3. view an individual review.
4. view an individual review's comments.
5. vote on an review and immediately see the change, and can only vote once.
6. vote on a comment and immediately see the change, and can only vote once.
7. post a new comment to an existing review (as a default logged in user. e.g. 'jessjelly').
8. delete my own comments (as a default logged in user. e.g. 'jessjelly').
9. delete my own reviews.
10. sort reviews by:
    - title
    - designer
    - author
    - created_at
    - votes
11. order reviews by:
    - descending order
    - ascending order
12. filter reviews by:
    - category
    - author
13. limit reviews per page
14. limit comments per page
15. navigate over pages of reviews by using pagination.
16. navigate over pages of comments by using pagination.
17. see page numbers of reviews and comments
18. edit my own review
19. edit my own comment
20. cannot edit nor delete other user's content (edit / delete buttons will not shown if I am not the owner of the post)
21. view a list of users
22. view any specific user's profile by clicking its link
23. log in and log out user account
24. post a new review to an existing topic.
25. add / post a new category for reviews
26. sign up as a new user
27. cannot vote my own review / comment
28. go to home page by clicking header, which also resets all filters and settings
29. view a list of all reviews written by any specific user.
30. see an error page when necessary

**Error-handling: As a user, I am ...**

31. able to see an appropriate error if I go on a non-existent path / a path for a non-existent review / topic.
32. not allowed to post a comment if I have not filled in all of the form boxes.

**As a hiring partner, I am able to...**

33. use the site on my mobile without sacrificing style or functionality (as I may not have my laptop nearby).
34. follow the readme instructions to easily run the project locally.
35. find a link to the hosted version of the project in the readme. (use a placeholder if not yet hosted!)
36. find a link to the back-end repository of the project in the readme.
37. find a link to the hosted version of the back-end project in the readme.

#

### Future scope (not yet implemented)

1. As a user, I should be able to see which users have been most active adding reviews and comments
2. As a user, I should be able to sort the users by how popular they are based on an aggregation of their review and comment vote counts
3. As a user, I can change my profile information if I am "logged in as the right user"
4. As a user, I can view for all the reviews a user (can be self or another specific user) has liked
5. I can see the page to automatically update with a little notification if there have been any recent posts, e.g. last 10 minutes. (using websocket and socketIO)
