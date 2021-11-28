import "../styles/Compose.css";
import { postCategory, getCategories } from "../utils/api";
import { useState, useEffect } from "react";

export default function Compose({ categories, setCategories }) {
  const [newCategory, setNewCategory] = useState({});

  const [newReview, setNewReview] = useState({});
  const [needNewCat, setNeedNewCat] = useState(false);

  const handleSubmit = (e) => {};

  useEffect(() => {
    getCategories()
      .then(({ data }) => {
        setCategories(data.categories);
      })
      .catch((err) => console.log(err));
  }, [newCategory, setNewCategory]);

  const submitCategory = (e) => {
    e.preventDefault();
    postCategory(newCategory).catch((err) => console.dir(err));
    setNewCategory({});
    setNeedNewCat(false);
    getCategories()
      .then(({ data }) => {
        setCategories(data.categories);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <main className="main">
        <h3 className="compose-title">Compose a new Review:</h3>
        <p>
          Do you need to create a new category?
          <button
            onClick={() => {
              setNeedNewCat(true);
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setNeedNewCat(false);
            }}
          >
            No
          </button>
        </p>
        {needNewCat ? (
          <>
            <section className="yes-or-no">
              {categories
                .map((category) => {
                  return category.slug;
                })
                .includes(newCategory.slug) ? null : (
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
              )}
            </section>
          </>
        ) : (
          <form className="compose-form">
            <p>Please give a review title:</p>
            <input
              type="text"
              placeholder="review title"
              name="title"
              onChange={(event) => {
                setNewReview((current) => {
                  return {
                    ...current,
                    title: event.target.value,
                  };
                });
              }}
            />
            <p>Please choose your category:</p>
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
            </select>
          </form>
        )}
      </main>
    </div>
  );
}
