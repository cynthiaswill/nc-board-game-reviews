# NC Board Game Reviews

This is a **front end** API repo.

It is a social games rating, and discussion website, with built-in live chat messenger and search feature, mainly built with React.js.

A live version of this **front end** / website is **hosted at**:

- https://quizzical-bohr-776a6e.netlify.app

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
31. send instant message and chat with other online members
32. live chat with multiple end users in different chat rooms
33. choose a chat room depends on which game category is interested in
34. check online status of all friends / users in a list in real time
35. check how many online users in real time
36. search reviews by a given pattern of text
37. search key words to match in any review title, designer, author and review article text content
38. highlight any matched words in search results
39. search locally within current category
40. search globally to find match in the entire website / library
41. see the current date and time and number of online users in real time

**Error-handling: As a user, I am ...**

42. able to see an appropriate error if I go on a non-existent path / a path for a non-existent review / topic.
43. not allowed to post a comment if I have not filled in all of the form boxes.

**As a hiring partner, I am able to...**

44. use the site on my mobile without sacrificing style or functionality (as I may not have my laptop nearby).
45. follow the readme instructions to easily run the project locally.
46. find a link to the hosted version of the project in the readme. (use a placeholder if not yet hosted!)
47. find a link to the back-end repository of the project in the readme.
48. find a link to the hosted version of the back-end project in the readme.

#
