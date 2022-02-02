import { getDescription, numArr } from "../utils/utils";
import { getCategories, updateOnlineUsers } from "../utils/api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";
import { FaPencilAlt } from "react-icons/fa";
import { GiEntryDoor, GiExitDoor } from "react-icons/gi";
import { AiOutlineForm } from "react-icons/ai";
import { AuthorContext } from "../contexts/AuthorContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { CategoryContext } from "../contexts/CategoryContext";
import { CatQueriesContext } from "../contexts/CatQueriesContext";
import { SearchContext } from "../contexts/SearchContext";
import { OnlineUsersContext } from "../contexts/OnlineUsersContext";
import useWindowDimensions from "../hooks/WindowDimentions";
import SearchBar from "./SearchBar";
import Chat from "./Chat";

export default function Nav({ reviewsCount, reset, setReset, authors }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, isLogged } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const { setAuthor } = useContext(AuthorContext);
  const { setCategory } = useContext(CategoryContext);
  const { setPattern } = useContext(SearchContext);
  const { onlineUsers, setOnlineUsers } = useContext(OnlineUsersContext);
  const { categories, setCategories } = useContext(CategoriesContext);
  const { catQueries, setCatQueries } = useContext(CatQueriesContext);
  const [showPagination, setShowPagination] = useState(true);
  const { width } = useWindowDimensions();

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
      setPattern(null);
      setReset(false);
    }
  }, [
    user,
    setCategories,
    navigate,
    setPattern,
    reset,
    setReset,
    setAuthor,
    setError,
    location.pathname,
    setCatQueries,
    setCategory,
  ]);

  const handleSignOut = () => {
    const newOnlineUsers = [...onlineUsers].filter((name) => name !== user.username);
    updateOnlineUsers({ onlineUsers: [...newOnlineUsers] });
    setOnlineUsers([...newOnlineUsers]);
    setUser({});
  };

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
              setPattern(null);
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
                  setPattern(null);
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
              style={{ borderRadius: 5 }}
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
                setPattern(null);
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
              style={{ borderRadius: 5 }}
              onChange={(e) => {
                setPattern(null);
                setAuthor(e.target.value);
                document.getElementById("per-page-option").selectedIndex = "null";
                setCatQueries((current) => {
                  return { ...current, limit: 99 };
                });
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
              style={{ borderRadius: 5 }}
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
              style={{ borderRadius: 5 }}
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
              style={{ borderRadius: 5 }}
              onChange={(e) => {
                setCatQueries((current) => {
                  return { ...current, limit: e.target.value };
                });
                navigate("/reviews");
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
            <Link to="/" id="login-link" onClick={handleSignOut}>
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
          {width > 600 ? null : <SearchBar />}
          {isLogged ? (
            <Link to="/" id="narrow-login-link" onClick={handleSignOut}>
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
              <Link to={`/users/${user.username}`} className="author-link">
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
          <Link to="/sign-up" id="sign-up-link">
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
      <div className="chat-container">
        {width < 812 || location.pathname.slice(0, 8) !== "/reviews" ? <Chat /> : null}
      </div>
    </div>
  );
}
