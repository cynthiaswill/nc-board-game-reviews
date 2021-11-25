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
