import "../styles/Reviews.css";
import { getReviews, incKudos } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";
import { UserContext } from "../contexts/UserContext";
import { filterReviewsByAuthor } from "../utils/utils";

export default function Reviews({
  catQueries,
  category,
  setReviewsCount,
  author,
  setAuthors,
}) {
  const { setError } = useContext(ErrorContext);
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [addedKudos, setAddedKudos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
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
  ]);

  if (isLoading === true) {
    return <h2>Loading...</h2>;
  }
  return (
    <main className="main">
      <h3 className="category-title">
        {category.slug}:
        <span className="page-number-in-reviews">Page {catQueries.p}</span>
      </h3>

      <p className="category-description">{category.description}</p>
      {reviews.map((review) => {
        return (
          <div key={review.review_id} className="review-item">
            <section className="review-card">
              <h3 className="review-title">
                <Link to={`/reviews/${review.review_id}`}> {review.title} </Link>
              </h3>
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
                  Date posted: {review.created_at.slice(0, 19).replaceAll("T", " at ")}
                </span>
                <br />
              </div>
            </section>
            <Link to={`/reviews/${review.review_id}`} className="read-more">
              Read More
            </Link>
            <section>
              <button
                className="comments-button"
                onClick={() => {
                  navigate(`/reviews/${review.review_id}`);
                }}
              >
                Comments: {review.comment_count}
              </button>
              <button
                className="kudos-button"
                disabled={!!(user.username === review.owner) || hasVoted}
                onClick={() => {
                  setAddedKudos((current) => {
                    return current + 1;
                  });
                  incKudos(review.review_id, { inc_votes: 1 });
                  setHasVoted(true);
                }}
              >
                Kudos: {review.votes + addedKudos}
              </button>
            </section>
          </div>
        );
      })}
    </main>
  );
}
