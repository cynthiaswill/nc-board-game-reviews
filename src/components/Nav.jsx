import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "./utils/api";

export default function Nav() {
  const [categories, setCategories] = useState([]);
  const numArr = [];
  for (let i = 1; i <= 20; i++) {
    numArr.push(i);
  }

  useEffect(() => {
    getCategories()
      .then(({ data }) => {
        setCategories(data.categories);
      })
      .catch((err) => console.log(err));
  }, [categories]);

  return (
    <div className="nav">
      <nav>
        <div className="categories-in-nav">
          <Link className="category-links" to="/reviews">
            All
          </Link>
          {categories.map((category) => {
            return (
              <Link
                className="category-links"
                key={`${category.slug}`}
                to="/reviews?category={category.slug}"
              >{`${category.slug}`}</Link>
            );
          })}
        </div>
        <div>
          <select id="sort-option" className="nav-options">
            <option value="created_at" default hidden>
              sort by
            </option>
            <option value="title">title</option>
            <option value="designer">designer</option>
            <option value="owner">author</option>
            <option value="created_at">date created</option>
            <option value="votes">votes</option>
          </select>
          <select id="order-option" className="nav-options">
            <option value="desc" default hidden>
              order by
            </option>
            <option value="desc">descending</option>
            <option value="asc">ascending</option>
          </select>
          <select id="per-page-option" className="nav-options">
            <option value="10" default hidden>
              reviews per page
            </option>
            {numArr.map((num) => {
              return (
                <option key={num} value={num}>
                  {num}
                </option>
              );
            })}
          </select>
        </div>
      </nav>
    </div>
  );
}
