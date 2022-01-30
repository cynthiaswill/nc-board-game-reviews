import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import { CatQueriesContext } from "../contexts/CatQueriesContext";
import { SearchContext } from "../contexts/SearchContext";
import useWindowDimensions from "../hooks/WindowDimentions";
import { AuthorContext } from "../contexts/AuthorContext";

export default function SearchBar() {
  const { setCategory } = useContext(CategoryContext);
  const { setCatQueries } = useContext(CatQueriesContext);
  const { setAuthor } = useContext(AuthorContext);
  const { pattern, setPattern } = useContext(SearchContext);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <input
        type="text"
        placeholder={pattern || "Search..."}
        name="match"
        size={width > 600 ? 22 : 19}
        style={{ borderRadius: 5 }}
        onFocus={(e) => setPattern(null)}
        onChange={(e) => {
          setPattern(e.target.value);
        }}
      />
      <button
        type="submit"
        className="searchButton"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("author-option").selectedIndex = "null";
          navigate("/reviews");
          setCategory({ slug: "All categories", description: "" });
          setAuthor("");
          setCatQueries({
            sort: "created_at",
            order: "desc",
            limit: 999,
            p: 1,
            category: "",
          });
        }}
      >
        <i className="fa fa-search" />
        <span className="searchTooltip">search entire reviews library</span>
      </button>
    </div>
  );
}
