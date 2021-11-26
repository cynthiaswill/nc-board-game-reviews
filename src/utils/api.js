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

export const postReview = () => {};

export const incLikes = (comment_id, { inc_votes }) => {
  return gamesApi.patch(`/comments/${comment_id}`, { inc_votes });
};

export const editComment = (comment_id, { body }) => {
  return gamesApi.patch(`/comments/${comment_id}`, { body });
};
