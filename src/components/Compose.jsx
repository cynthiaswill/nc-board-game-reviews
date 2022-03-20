import "../styles/Compose.css";
import { postCategory, getCategories, postReview } from "../utils/api";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";
import TextField from "@material-ui/core/TextField";
import { ParticleContext } from "../contexts/ParticleContext";
import { urlRegex, particleOptions } from "../utils/utils";
import { CategoriesContext } from "../contexts/CategoriesContext";

export default function Compose() {
  const { user, isLogged } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const { setParticleOps } = useContext(ParticleContext);
  const { categories, setCategories } = useContext(CategoriesContext);
  const [newCategory, setNewCategory] = useState({});
  const [newReview, setNewReview] = useState({});
  const [needNewCat, setNeedNewCat] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [showDesignerValidation, setShowDesignerValidation] = useState(false);
  const [showUrlValidation, setShowUrlValidation] = useState(false);
  const [showV1, setShowV1] = useState(false);
  const [showV2, setShowV2] = useState(false);
  const [showV3, setShowV3] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isSubscribed = true;
    setParticleOps(particleOptions);
    setNewReview((current) => {
      return { ...current, owner: `${user.username}` };
    });
    getCategories()
      .then(({ data }) => {
        isSubscribed && setCategories(data.categories);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
    return () => (isSubscribed = false);
  }, [newCategory, setCategories, user, navigate, setError, setParticleOps]);

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ alignSelf: "center" }}>
              Do you need to create a new category?
            </div>
            <section className="yes-no-buttons">
              <button
                disabled={needNewCat}
                onClick={() => {
                  setNeedNewCat(true);
                }}
              >
                Yes
              </button>
              <button
                disabled={!needNewCat}
                onClick={() => {
                  setNeedNewCat(false);
                  setShowV1(false);
                  setShowV2(false);
                  setShowV3(false);
                }}
              >
                No
              </button>

              <br />
            </section>
          </div>
          <>
            {needNewCat ? (
              <section style={{ animation: "phaseIn 0.5s ease-out" }}>
                <form
                  onSubmit={submitCategory}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="yes-or-no">
                    <TextField
                      size="small"
                      label="Enter new category name..."
                      inputProps={{ style: { fontSize: 12, marginTop: 5 } }}
                      InputLabelProps={{
                        style: { fontSize: 12, marginTop: 5 },
                      }}
                      style={{
                        width: 175,
                        alignSelf: "center",
                        marginLeft: 7,
                        marginRight: 7,
                      }}
                      onChange={(event) => {
                        setNewCategory((current) => {
                          return {
                            ...current,
                            slug: event.target.value,
                          };
                        });
                      }}
                      onBlur={(event) => {
                        if (
                          categories
                            .map((category) => category.slug)
                            .includes(event.target.value)
                        ) {
                          setShowV3(true);
                          setShowV1(false);
                        } else if (/[^\w-.\s]/.test(event.target.value)) {
                          setShowV1(true);
                          setShowV3(false);
                        } else {
                          setShowV1(false);
                          setShowV3(false);
                        }
                      }}
                      required
                      maxLength="25"
                    />
                    <TextField
                      size="small"
                      label="Please give a description..."
                      inputProps={{ style: { fontSize: 12, marginTop: 5 } }}
                      InputLabelProps={{ style: { fontSize: 12, marginTop: 5 } }}
                      style={{
                        width: 175,
                        alignSelf: "center",
                        marginLeft: 7,
                        marginRight: 7,
                      }}
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
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {showV1 ? (
                      <p className="validation">
                        Category can only contain any text characters or punctuations.
                      </p>
                    ) : null}
                    {showV2 ? (
                      <p className="validation">
                        Description can only contain any text characters or punctuations.
                      </p>
                    ) : null}
                    {showV3 ? (
                      <p className="validation">This category name already exist...</p>
                    ) : null}
                  </div>
                  <br />
                  <button
                    type="submit"
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    Submit Category
                  </button>
                </form>
              </section>
            ) : (
              <form className="compose-form" onSubmit={handleSubmit}>
                <br />
                <TextField
                  label="Please give a review title"
                  size="small"
                  inputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  style={{
                    marginTop: 0,
                    width: 160,
                    alignSelf: "center",
                  }}
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
                <br />
                <br />
                <select
                  name="category"
                  style={{ backgroundColor: "lightgray", borderRadius: 5 }}
                  onChange={(event) => {
                    setNewReview((current) => {
                      return { ...current, category: event.target.value };
                    });
                  }}
                >
                  <option default hidden>
                    Choose your category ...
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
                <br />
                <TextField
                  label="Please enter game designer's name:"
                  size="small"
                  inputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  style={{
                    marginTop: 0,
                    width: 220,
                    alignSelf: "center",
                  }}
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
                <TextField
                  label="Please give an URL for a display image:"
                  size="small"
                  inputProps={{ style: { fontSize: 12 } }}
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  style={{
                    marginTop: 0,
                    width: 220,
                    alignSelf: "center",
                  }}
                  onChange={(event) => {
                    setNewReview((current) => {
                      return {
                        ...current,
                        review_img_url: event.target.value,
                      };
                    });
                  }}
                  onBlur={(event) => {
                    if (urlRegex.test(event.target.value) || !event.target.value) {
                      setShowUrlValidation(false);
                    } else {
                      setShowUrlValidation(true);
                    }
                  }}
                  maxLength="25"
                />
                {showUrlValidation ? (
                  <p className="validation">Please enter a valid URL!</p>
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
