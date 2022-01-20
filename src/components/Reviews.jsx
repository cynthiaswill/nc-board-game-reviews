import "../styles/Reviews.css";
import { getReviews } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";
import { ParticleContext } from "../contexts/ParticleContext";
import { filterReviewsByAuthor, particleOptions } from "../utils/utils";
import { FaRegCommentAlt, FaRegCalendarAlt } from "react-icons/fa";
import Kudos from "./Kudos";
import WatchToggle from "./WatchToggle";
import SideMenu from "./SideMenu";

export default function Reviews({
  catQueries,
  category,
  setReviewsCount,
  author,
  setAuthors,
}) {
  const { setError } = useContext(ErrorContext);
  const { setParticleOps } = useContext(ParticleContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setParticleOps(particleOptions);
    getReviews(catQueries)
      .then(({ data }) => {
        const authorsArr = data.reviews.map((review) => {
          return review.owner;
        });
        setAuthors([...new Set(authorsArr)]);

        if (author !== "") {
          setReviews(filterReviewsByAuthor(data.reviews, author));
        } else {
          setReviews(data.reviews);
        }
        setReviewsCount(reviews.length);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
  }, [
    catQueries,
    category,
    setError,
    navigate,
    setReviewsCount,
    reviews.length,
    author,
    setAuthors,
    setParticleOps,
  ]);

  if (isLoading === true) {
    return (
      <h2>
        <i className="fa fa-cog fa-spin" style={{ fontSize: 20 }} /> Loading...
      </h2>
    );
  }
  return (
    <main className="main">
      <div className="mainView">
        <h3 className="category-title">
          {category.slug}:
          <span className="page-number-in-reviews">Page {catQueries.p}</span>
        </h3>

        <p className="category-description">{category.description}</p>
        {reviews.map((review) => {
          return (
            <div key={review.review_id} className="review-item">
              <section className="review-card">
                <div className="review-title-row">
                  <h3 className="review-title">
                    <Link
                      to={`/reviews/${review.review_id}`}
                      className="review-title-link"
                    >
                      {" "}
                      {review.title}{" "}
                    </Link>
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <WatchToggle className="watch-toggle" />
                  </div>
                </div>
                <span className="slug-name-in-reviews">Category: {review.category}</span>{" "}
                <span className="designer-name-in-reviews">
                  Designer: {review.designer}
                </span>
                <br />
                <div className="image-container-in-reviews">
                  <img
                    className="review-img"
                    src={review.review_img_url}
                    alt={review.title}
                  />
                </div>
                <div>
                  <p className="body-text-in-reviews">{review.review_body}</p>
                  <span className="author-in-reviews">
                    Author:{" "}
                    <Link to={`/users/${review.owner}`} className="author-link">
                      {review.owner}
                    </Link>
                  </span>
                  <span className="date-posted-in-reviews">
                    <FaRegCalendarAlt />{" "}
                    {review.created_at.slice(0, 19).replaceAll("T", " at ")}
                  </span>
                  <br />
                </div>
              </section>
              <Link to={`/reviews/${review.review_id}`} className="read-more">
                Read More
              </Link>
              <section>
                <button
                  className="view-comments-button"
                  onClick={() => {
                    navigate(`/reviews/${review.review_id}`);
                  }}
                >
                  <FaRegCommentAlt className="commentIcon" /> {review.comment_count}
                  <span className="commentsTooltipText">view comments</span>
                </button>
                <Kudos review={review} />
              </section>
            </div>
          );
        })}
      </div>
      <div className="sideMenu">
        <SideMenu className="sideMenuContainer" />
      </div>
    </main>
  );
}
