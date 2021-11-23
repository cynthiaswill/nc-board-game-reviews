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
  console.log(path);
  return gamesApi.get(`${path}`);
};
