import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "./utils/api";

export default function Nav({ setCatQueries }) {
  const navigate = useNavigate();
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
          <Link
            className="category-links"
            to="/reviews"
            onClick={(e) => {
              setCatQueries((current) => {
                const newCurrent = [];
                newCurrent.push(current[0], current[1], current[2], current[3]);
                navigate("/reviews");
                return newCurrent;
              });
            }}
          >
            All
          </Link>
          {categories.map((category) => {
            return (
              <Link
                className="category-links"
                key={category.slug}
                to="/reviews"
                onClick={(e) => {
                  setCatQueries((current) => {
                    let newCurrent = [...current];
                    newCurrent.push(category.slug);
                    navigate("/reviews");
                    return newCurrent;
                  });
                }}
              >{`${category.slug}`}</Link>
            );
          })}
        </div>
        <div>
          <select
            id="sort-option"
            className="nav-options"
            onChange={(e) => {
              setCatQueries((current) => {
                let newCurrent = [...current];
                newCurrent[0] = e.target.value;
                navigate("/reviews");
                return newCurrent;
              });
            }}
          >
            <option value="created_at" default>
              sort by
            </option>
            <option value="title">title</option>
            <option value="designer">designer</option>
            <option value="owner">author</option>
            <option value="created_at">date created</option>
            <option value="votes">votes</option>
          </select>
          <select
            id="order-option"
            className="nav-options"
            onChange={(e) => {
              setCatQueries((current) => {
                let newCurrent = [...current];
                newCurrent[1] = e.target.value;
                navigate("/reviews");
                return newCurrent;
              });
            }}
          >
            <option value="desc" default>
              order by
            </option>
            <option value="desc">descending</option>
            <option value="asc">ascending</option>
          </select>
          <select
            id="per-page-option"
            className="nav-options"
            onChange={(e) => {
              setCatQueries((current) => {
                let newCurrent = [...current];
                newCurrent[2] = e.target.value;
                navigate("/reviews");
                return newCurrent;
              });
            }}
          >
            <option value="10" default>
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
