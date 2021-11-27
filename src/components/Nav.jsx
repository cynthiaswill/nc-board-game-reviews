import { getDescription } from "../utils/utils";
import { getCategories } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Nav({ setCatQueries, setCategory, user, setUser, isLogged }) {
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
  }, [user]);

  return (
    <div>
      <nav className="nav">
        <div className="categories-in-nav">
          <Link
            className="category-links"
            to="/reviews"
            onClick={() => {
              setCatQueries((current) => {
                const newCurrent = { ...current };
                newCurrent.category = "";
                navigate("/reviews");
                return newCurrent;
              });
              setCategory({ slug: "All categories", description: "" });
            }}
          >
            All categories
          </Link>
          {categories.map((category) => {
            return (
              <Link
                className="category-links"
                key={category.slug}
                to="/reviews"
                onClick={(e) => {
                  setCatQueries((current) => {
                    let newCurrent = { ...current };
                    newCurrent.category = category.slug;
                    navigate("/reviews");
                    return newCurrent;
                  });
                  setCategory({
                    slug: `${category.slug}`,
                    description: `${getDescription(category.slug, categories)}`,
                  });
                }}
              >{`${category.slug}`}</Link>
            );
          })}
        </div>
        <div id="flex-in-nav">
          <Link to="/compose" id="compose-link">
            Compose!
          </Link>
          <div className="selectors-in-nav">
            <select
              id="narrow-cat-options"
              onChange={(e) => {
                if (e.target.value === "All categories") {
                  setCatQueries((current) => {
                    const newCurrent = { ...current };
                    newCurrent.category = "";
                    navigate("/reviews");
                    return newCurrent;
                  });
                  setCategory({ slug: "All categories", description: "" });
                } else {
                  setCatQueries((current) => {
                    let newCurrent = { ...current };
                    newCurrent.category = e.target.value;
                    navigate("/reviews");
                    return newCurrent;
                  });
                  setCategory({
                    slug: `${e.target.value}`,
                    description: `${getDescription(e.target.value, categories)}`,
                  });
                }
              }}
            >
              <option
                key={`All categories`}
                value={`All categories`}
                default
              >{`All categories`}</option>
              {categories.map((category) => {
                return (
                  <option
                    key={category.slug}
                    value={category.slug}
                  >{`${category.slug}`}</option>
                );
              })}
            </select>

            <select
              id="sort-option"
              className="nav-options"
              onChange={(e) => {
                setCatQueries((current) => {
                  let newCurrent = { ...current };
                  newCurrent.sort = e.target.value;
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
                  let newCurrent = { ...current };
                  newCurrent.order = e.target.value;
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
                  let newCurrent = { ...current };
                  newCurrent.limit = e.target.value;
                  navigate("/reviews");
                  return newCurrent;
                });
              }}
            >
              <option value="10" default>
                items per page
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
          {isLogged ? (
            <Link
              to="/"
              id="login-link"
              onClick={() => {
                setUser({});
              }}
            >
              Logout
            </Link>
          ) : (
            <Link to="/users" id="login-link">
              Login
            </Link>
          )}
          <Link to="/" id="narrow-compose-link">
            Compose!
          </Link>
          {isLogged ? (
            <Link
              to="/"
              id="narrow-login-link"
              onClick={() => {
                setUser({});
              }}
            >
              Logout
            </Link>
          ) : (
            <Link to="/users" id="narrow-login-link">
              Login
            </Link>
          )}
        </div>
      </nav>
      <div className="logged-user">
        {isLogged ? (
          <div>
            <span>
              Hello!{" "}
              <Link to={`/users/${user.username}`} className="user-link">
                {user.username}
              </Link>
            </span>
            <img
              className="user-icon"
              src="https://source.unsplash.com/random/300x200"
              alt={user.username}
            ></img>
          </div>
        ) : (
          <Link to="/sign-up">Sign Up</Link>
        )}
      </div>
    </div>
  );
}
