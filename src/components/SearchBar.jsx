import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import { CatQueriesContext } from "../contexts/CatQueriesContext";
import { SearchContext } from "../contexts/SearchContext";

export default function SearchBar() {
  const { setCategory } = useContext(CategoryContext);
  const { setCatQueries } = useContext(CatQueriesContext);
  const { pattern, setPattern } = useContext(SearchContext);
  const navigate = useNavigate();

  return (
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
  );
}
