import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "./utils/api";

export default function Nav() {
  const [categories, setCategories] = useState([]);

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
      </nav>
    </div>
  );
}
