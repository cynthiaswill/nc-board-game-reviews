import { Link, useNavigate } from "react-router-dom";
import { getDescription } from "../utils/utils";
import { useContext } from "react";
import { AuthorContext } from "../contexts/AuthorContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { CategoryContext } from "../contexts/CategoryContext";
import { CatQueriesContext } from "../contexts/CatQueriesContext";

export default function SideMenu() {
  const navigate = useNavigate();
  const { setAuthor } = useContext(AuthorContext);
  const { categories } = useContext(CategoriesContext);
  const { setCategory } = useContext(CategoryContext);
  const { setCatQueries } = useContext(CatQueriesContext);

  return (
    <>
      <div className="search-container">
        <form action="/action_page.php">
          <input type="text" placeholder="Search..." name="search" size="25" />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <br />
      <div>highest rated</div>
      <div>
        <div
          className="categories-in-side-menu"
          style={{ display: "flex", flexDirection: "column" }}
        >
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
      </div>
      <div>live chat</div>
    </>
  );
}
