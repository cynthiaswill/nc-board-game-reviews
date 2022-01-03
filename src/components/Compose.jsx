import "../styles/Compose.css";
import { postCategory, getCategories, postReview } from "../utils/api";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";

export default function Compose({ categories, setCategories }) {
  const { user, isLogged } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const [newCategory, setNewCategory] = useState({});
  const [newReview, setNewReview] = useState({});
  const [needNewCat, setNeedNewCat] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showDesignerValidation, setShowDesignerValidation] = useState(false);
  const [showV1, setShowV1] = useState(false);
  const [showV2, setShowV2] = useState(false);
  const [showV3, setShowV3] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setNewReview((current) => {
      return { ...current, owner: `${user.username}` };
    });
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
  }, [newCategory, setCategories, user, navigate, setError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogged) {
      postReview(newReview)
        .then(() => {
          navigate("/reviews");
        })
        .catch((err) => {
          if (err) {
            setError(err.response.status);
            navigate("/error");
          }
        });
    } else {
      setError(530);
      navigate("/error");
    }
  };

  const submitCategory = (e) => {
    e.preventDefault();
    if (isLogged) {
      postCategory(newCategory).catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
      setNewCategory({});
      setNeedNewCat(false);
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
    } else {
      setError(530);
      navigate("/error");
    }
  };

  return (
    <div className="main-container">
      <main className="main-compose">
        <div className="compose-container">
          <h3 className="compose-title">Compose a new Review:</h3>
          <div className="yes-or-no">
            Do you need to create a new category?
            <section className="yes-no-buttons">
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
            </section>
          </div>
          <>
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
                      onChange={(event) => {
                        if (
                          categories
                            .map((category) => category.slug)
                            .includes(event.target.value)
                        ) {
                          setShowV3(true);
                        }
                      }}
                      onBlur={(event) => {
                        if (/[^\w-.\s]/.test(event.target.value)) {
                          setShowV1(true);
                        } else {
                          setShowV1(false);
                        }
                      }}
                      required
                      maxLength="25"
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
                      onBlur={(event) => {
                        if (/[^\w-.\s]/.test(event.target.value)) {
                          setShowV2(true);
                        } else {
                          setShowV2(false);
                        }
                      }}
                      required
                    />
                    {showV1 ? (
                      <p className="validation">
                        Category can only contain any text characters or punctuations.
                      </p>
                    ) : (
                      <br />
                    )}
                    {showV2 ? (
                      <p className="validation">
                        Description can only contain any text characters or punctuations.
                      </p>
                    ) : (
                      <br />
                    )}
                    {showV3 ? (
                      <p className="validation">This category already exist.</p>
                    ) : (
                      <br />
                    )}
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
                  onBlur={(event) => {
                    if (/[^\w-.\s]/.test(event.target.value)) {
                      setShowValidation(true);
                    } else {
                      setShowValidation(false);
                    }
                  }}
                  required
                  maxLength="25"
                />
                {showValidation ? (
                  <p className="validation">
                    Title can only contain any text characters or punctuations.
                  </p>
                ) : (
                  <br />
                )}
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
                  onBlur={(event) => {
                    if (/[^\w-.\s]/.test(event.target.value)) {
                      setShowDesignerValidation(true);
                    } else {
                      setShowDesignerValidation(false);
                    }
                  }}
                  required
                  maxLength="25"
                />
                {showDesignerValidation ? (
                  <p className="validation">
                    Designer can only contain any word characters.
                  </p>
                ) : (
                  <br />
                )}
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
                  required
                />
                <br />
                <br />
                <button type="submit">Submit</button>
              </form>
            )}
          </>
        </div>
      </main>
    </div>
  );
}
