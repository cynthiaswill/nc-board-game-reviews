import { useNavigate } from "react-router-dom";
import { getDescription } from "../utils/utils";
import { useContext } from "react";
import { AuthorContext } from "../contexts/AuthorContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { CategoryContext } from "../contexts/CategoryContext";
import { CatQueriesContext } from "../contexts/CatQueriesContext";
import { SearchContext } from "../contexts/SearchContext";
import Chat from "./Chat";

export default function SideMenu() {
  const navigate = useNavigate();
  const { setAuthor } = useContext(AuthorContext);
  const { categories } = useContext(CategoriesContext);
  const { category, setCategory } = useContext(CategoryContext);
  const { setCatQueries } = useContext(CatQueriesContext);
  const { pattern, setPattern } = useContext(SearchContext);
  let buttonStyle = "category-links";
  if (category.slug === "All categories") {
    buttonStyle = "category-links-selected";
  } else {
    buttonStyle = "category-links";
  }

  return (
    <>
      <div className="top-part-in-side-menu">
        <div className="search-container">
          <form action="/reviews">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                type="text"
                placeholder={pattern || "Search..."}
                name="match"
                size="22"
                style={{ flexGrow: 4, borderRadius: 5 }}
                onFocus={(e) => setPattern(null)}
                onChange={(e) => {
                  setPattern(e.target.value);
                }}
              />
              <button
                type="submit"
                style={{ flexGrow: 1 }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/reviews");
                  setCategory({ slug: "All categories", description: "" });
                  setCatQueries({
                    sort: "created_at",
                    order: "desc",
                    limit: 999,
                    p: 1,
                    category: "",
                  });
                }}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </div>
        <br />
        <div
          className="categories-in-side-menu"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: "rgb(70,70,70)",
              marginLeft: "5px",
            }}
          >
            By category:
          </p>
          <button
            className={buttonStyle}
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
          </button>
          {categories.map((cat) => {
            if (cat.slug === category.slug) {
              buttonStyle = "category-links-selected";
            } else {
              buttonStyle = "category-links";
            }
            return (
              <button
                className={buttonStyle}
                key={cat.slug}
                onClick={(e) => {
                  setCatQueries((current) => {
                    return { ...current, p: 1, category: cat.slug };
                  });
                  setCategory({
                    slug: `${cat.slug}`,
                    description: `${getDescription(cat.slug, categories)}`,
                  });
                  document.getElementById("author-option").selectedIndex = "null";
                  setAuthor("");
                  navigate("/reviews");
                }}
              >{`${cat.slug}`}</button>
            );
          })}
        </div>
      </div>
      <br />
      <div
        className="chat-container-in-side-menu"
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "15px",
          height: "40px",
        }}
      >
        <Chat />
      </div>
    </>
  );
}
