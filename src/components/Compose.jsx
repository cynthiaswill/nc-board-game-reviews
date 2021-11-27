import "../styles/Compose.css";
import { postCategory, getCategories } from "../utils/api";
import { useState, useEffect } from "react";

export default function Compose({ categories, setCategories }) {
  const [newCategory, setNewCategory] = useState({
    slug: "",
    description: "",
  });

  const [newReview, setNewReview] = useState({});

  useEffect(() => {
    getCategories()
      .then(({ data }) => {
        setCategories(data.categories);
      })
      .catch((err) => console.log(err));
  }, [setCategories]);

  const handleSubmit = (e) => {};

  const submitCategory = (e) => {
    e.preventDefault();
    e.preventDefault();
    postCategory(newCategory).then(({ data }) => {
      console.log(data);
      setNewCategory(data.category);
    });
  };

  return (
    <div>
      <main className="main">
        <h3 className="compose-title">Compose a new Review:</h3>
        <p>Please choose a category or create a new category:</p>
        <section className="category-chooser">
          <select
            name="category"
            id="category-chooser"
            onChange={(event) => {
              setNewCategory((current) => {
                return { ...current, slug: event.target.value };
              });
            }}
          >
            {categories.map((category) => {
              return (
                <option
                  key={category.slug}
                  value={category.slug}
                >{`${category.slug}`}</option>
              );
            })}
            <option value="">Create a New Category</option>
          </select>
          {newCategory.slug === "" ? (
            <form id="newCategorySubmit" onSubmit={submitCategory}>
              <input
                type="text"
                placeholder="enter new category name"
                name="slug"
                onChange={(event) => {
                  setNewCategory((current) => {
                    return {
                      ...current,
                      slug: event.target.value,
                    };
                  });
                }}
              />
              <input
                type="text"
                placeholder="please give a description..."
                name="description"
                onChange={(event) => {
                  setNewCategory((current) => {
                    return {
                      ...current,
                      description: event.target.value,
                    };
                  });
                }}
              />
              <button type="submit">Submit Category</button>
            </form>
          ) : null}
        </section>
      </main>
    </div>
  );
}
