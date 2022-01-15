import { getDescription, numArr } from "../utils/utils";
import { getCategories } from "../utils/api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";
import { FaPencilAlt } from "react-icons/fa";
import { GiEntryDoor, GiExitDoor } from "react-icons/gi";
import { AiOutlineForm } from "react-icons/ai";

export default function Nav({
  catQueries,
  setCatQueries,
  setCategory,
  categories,
  setCategories,
  reviewsCount,
  reset,
  setReset,
  setAuthor,
  authors,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, isLogged } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const [showPagination, setShowPagination] = useState(true);

  useEffect(() => {
    if (location.pathname === "/reviews") {
      setShowPagination(true);
    } else {
      setShowPagination(false);
    }
    getCategories()
      .then(({ data }) => {
        setCategories(data.categories);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
    if (reset) {
      document.getElementById("narrow-cat-options").selectedIndex = "null";
      document.getElementById("sort-option").selectedIndex = "null";
      document.getElementById("order-option").selectedIndex = "null";
      document.getElementById("per-page-option").selectedIndex = "null";
      document.getElementById("author-option").selectedIndex = "null";
      setCategory({ slug: "All categories", description: "" });
      setCatQueries({
        sort: "created_at",
        order: "desc",
        limit: 10,
        p: 1,
        category: "",
      });
      setAuthor("");
      setReset(false);
    }
  }, [
    user,
    setCategories,
    navigate,
    reset,
    setReset,
    setAuthor,
    setError,
    location.pathname,
    setCatQueries,
    setCategory,
  ]);

  return (
    <div>
      <nav className="nav">
        <div className="categories-in-nav">
          <Link
            className="category-links"
            to="/reviews"
            onClick={() => {
              setCatQueries((current) => {
                return { ...current, p: 1, category: "" };
              });
              setCategory({ slug: "All categories", description: "" });
              document.getElementById("author-option").selectedIndex = "null";
              setAuthor("");
              navigate("/reviews");
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
                    return { ...current, p: 1, category: category.slug };
                  });
                  setCategory({
                    slug: `${category.slug}`,
                    description: `${getDescription(category.slug, categories)}`,
                  });
                  document.getElementById("author-option").selectedIndex = "null";
                  setAuthor("");
                  navigate("/reviews");
                }}
              >{`${category.slug}`}</Link>
            );
          })}
        </div>
        <div id="flex-in-nav">
          <Link to="/compose" id="compose-link">
            <FaPencilAlt className="navIcon" /> Compose!
          </Link>
          <div className="selectors-in-nav">
            <select
              id="narrow-cat-options"
              onChange={(e) => {
                if (e.target.value === "All categories" || e.target.value === "all") {
                  setCatQueries((current) => {
                    return { ...current, category: "", p: 1 };
                  });
                  setCategory({ slug: "All categories", description: "" });
                } else {
                  setCatQueries((current) => {
                    return { ...current, category: e.target.value, p: 1 };
                  });
                  setCategory({
                    slug: `${e.target.value}`,
                    description: `${getDescription(e.target.value, categories)}`,
                  });
                }
                document.getElementById("author-option").selectedIndex = "null";
                setAuthor("");
                navigate("/reviews");
              }}
            >
              <option key="select category" value="all" default hidden>
                by category ...
              </option>
              <option key="All categories" value="All categories">
                All categories
              </option>
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
              id="author-option"
              className="nav-options"
              onChange={(e) => {
                setAuthor(e.target.value);
                navigate("/reviews");
              }}
            >
              <option value="" default hidden>
                by author ...
              </option>

              {authors.map((author) => {
                return <option key={author} value={author}>{`${author}`}</option>;
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
              <option value="created_at" default hidden>
                sort by ...
              </option>
              <option value="title">title</option>
              <option value="designer">designer</option>
              <option value="owner">author</option>
              <option value="created_at">date</option>
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
              <option value="DESC" default hidden>
                order by ...
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
              <option value="10" default hidden>
                10 per page
              </option>
              {numArr.map((num) => {
                return (
                  <option key={num} value={num}>
                    {num} per page
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
              Logout <GiEntryDoor className="navIcon" />
            </Link>
          ) : (
            <Link to="/users" id="login-link">
              Login <GiExitDoor className="navIcon" />
            </Link>
          )}
          <Link to="/compose" id="narrow-compose-link">
            <FaPencilAlt className="navIcon" /> Compose!
          </Link>
          {isLogged ? (
            <Link
              to="/"
              id="narrow-login-link"
              onClick={() => {
                setUser({});
              }}
            >
              Logout <GiEntryDoor className="navIcon" />
            </Link>
          ) : (
            <Link to="/users" id="narrow-login-link">
              Login <GiExitDoor className="navIcon" />
            </Link>
          )}
        </div>
      </nav>
      <div className="logged-user">
        {showPagination ? (
          <button
            className="page-button"
            disabled={catQueries.p === 1}
            onClick={() => {
              setCatQueries((curr) => {
                return { ...curr, p: curr.p - 1 };
              });
              navigate("/reviews");
            }}
          >
            &lt;&lt; prev
          </button>
        ) : null}
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
              src={user.avatar_url || "https://source.unsplash.com/random/300x200"}
              alt={user.username}
            ></img>
          </div>
        ) : (
          <Link to="/sign-up">
            <AiOutlineForm /> Sign Up
          </Link>
        )}
        {showPagination ? (
          <button
            className="page-button"
            disabled={reviewsCount < catQueries.limit}
            onClick={() => {
              setCatQueries((curr) => {
                return { ...curr, p: curr.p + 1 };
              });
              navigate("/reviews");
            }}
          >
            next &gt;&gt;
          </button>
        ) : null}
      </div>
    </div>
  );
}
