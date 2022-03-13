import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-board.herokuapp.com/api/",
});

export const getCategories = () => {
  return gamesApi.get("/categories");
};

export const getReviews = ({ sort, order, limit, p, category }) => {
  let path = `/reviews?sort_by=${sort}&&order=${order}&&limit=${limit}&&p=${p}`;
  if (category) {
    path += `&&category=${category}`;
  }
  return gamesApi.get(`${path}`);
};

export const getReviewById = (id) => {
  return gamesApi.get(`/reviews/${id}`);
};

export const deleteReviewById = (id) => {
  return gamesApi.delete(`/reviews/${id}`);
};

export const getComments = ({ review_id, limit, p }) => {
  let path = `/reviews/${review_id}/comments?p=${p}`;
  if (limit) {
    path += `&&limit=${limit}`;
  }
  return gamesApi.get(`${path}`);
};

export const incKudos = (review_id, { inc_votes }) => {
  return gamesApi.patch(`/reviews/${review_id}`, { inc_votes });
};

export const incLikes = (comment_id, { inc_votes }) => {
  return gamesApi.patch(`/comments/${comment_id}`, { inc_votes });
};

export const getUsers = () => {
  return gamesApi.get(`/users`);
};

export const getUser = (username) => {
  return gamesApi.get(`/users/${username}`);
};

export const postUser = (newUser) => {
  return gamesApi.post(`/users`, newUser);
};

export const postComment = (review_id, body) => {
  return gamesApi.post(`/reviews/${review_id}/comments`, body);
};

export const deleteComment = (comment_id) => {
  return gamesApi.delete(`comments/${comment_id}`);
};

export const editComment = (comment_id, { body }) => {
  return gamesApi.patch(`/comments/${comment_id}`, { body });
};

export const editReview = (review_id, { review_body }) => {
  return gamesApi.patch(`/reviews/${review_id}`, { review_body });
};

export const postCategory = ({ slug, description }) => {
  return gamesApi.post(`/categories`, { slug, description });
};

export const postReview = (body) => {
  return gamesApi.post("/reviews", body);
};

export const getHistory = (room) => {
  return gamesApi.get(`/messages/${room}`);
};

export const getOnlineUsers = () => {
  return gamesApi.get("/messages");
};

export const updateOnlineUsers = ({ onlineUsers }) => {
  return gamesApi.patch("/messages", { onlineUsers });
};

export const getKudosList = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}/voted`);
};

export const voteReview = (review_id, { username }) => {
  return gamesApi.post(`/reviews/${review_id}/voted`, { username });
};

export const unvoteReview = (review_id, { username }) => {
  return gamesApi.patch(`/reviews/${review_id}/voted`, { username });
};

export const getLikesList = (comment_id) => {
  return gamesApi.get(`/comments/${comment_id}/voted`);
};

export const voteComment = (comment_id, { username }) => {
  return gamesApi.post(`/comments/${comment_id}/voted`, { username });
};

export const unvoteComment = (comment_id, { username }) => {
  return gamesApi.patch(`/comments/${comment_id}/voted`, { username });
};

export const getWatcherList = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}/watched`);
};

export const watchReview = (review_id, { username }) => {
  return gamesApi.post(`/reviews/${review_id}/watched`, { username });
};

export const unwatchReview = (review_id, { username }) => {
  return gamesApi.patch(`/reviews/${review_id}/watched`, { username });
};

export const getWatchedReviews = (username) => {
  return gamesApi(`/users/${username}/watched`);
};
