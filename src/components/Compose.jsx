import "../styles/Compose.css";
import { postCategory, getCategories, postReview } from "../utils/api";
import { useState, useEffect } from "react";

export default function Compose({ user, categories, setCategories }) {
  const [newCategory, setNewCategory] = useState({});

  const [newReview, setNewReview] = useState({});
  const [needNewCat, setNeedNewCat] = useState(false);

  useEffect(() => {
    setNewReview((current) => {
      return { ...current, owner: `${user.username}` };
    });
    getCategories()
      .then(({ data }) => {
        setCategories(data.categories);
      })
      .catch((err) => console.log(err));
  }, [newCategory, setCategories, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newReview);
    postReview(newReview).catch((err) => console.dir(err));
  };

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
      <main className="main-compose">
        <div className="compose-container">
          <h3 className="compose-title">Compose a new Review:</h3>
          <p className="yes-or-no">
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
            <section className="yes-or-no">
              {categories
                .map((category) => {
                  return category.slug;
                })
                .includes(newCategory.slug) ? null : (
                <form onSubmit={submitCategory}>
                  <input
                    type="text"
                    size="22"
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
                    size="22"
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
          ) : (
            <form className="compose-form" onSubmit={handleSubmit}>
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
              <br />
              <p>Please choose your category:</p>
              <select
                name="category"
                onChange={(event) => {
                  setNewReview((current) => {
                    return { ...current, category: event.target.value };
                  });
                }}
              >
                <option default hidden>
                  ...
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
              <br />
              <p>Please enter game designer's name:</p>
              <input
                type="text"
                placeholder="designer"
                name="designer"
                onChange={(event) => {
                  setNewReview((current) => {
                    return {
                      ...current,
                      designer: event.target.value,
                    };
                  });
                }}
              />
              <br />
              <p>Please write review in the box below:</p>
              <textarea
                id="review-writing-box"
                rows="20"
                placeholder="write your review here ..."
                name="review_body"
                onChange={(event) => {
                  setNewReview((current) => {
                    return {
                      ...current,
                      review_body: event.target.value,
                    };
                  });
                }}
              />
              <br />
              <br />
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
