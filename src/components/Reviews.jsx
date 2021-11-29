import "../styles/Reviews.css";
import { getReviews, incKudos } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";

export default function Reviews({ catQueries, category }) {
  const { setError } = useContext(ErrorContext);
  const [reviews, setReviews] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getReviews(catQueries)
      .then(({ data }) => {
        setReviews(data.reviews);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("*");
        }
      });
    setIsVoted(false);
  }, [catQueries, category, isVoted, setError, navigate]);

  return (
    <main className="main">
      <h3 className="category-title">{category.slug}:</h3>
      <p className="category-description">{category.description}</p>
      {reviews.map((review) => {
        return (
          <div key={review.review_id} className="review-item">
            <section className="review-card">
              <h3 className="review-title">
                <Link to={`/reviews/${review.review_id}`}> {review.title} </Link>
              </h3>
              <span className="slug-name">Category: {review.category}</span>{" "}
              <span className="designer-name">Designer: {review.designer}</span>
              <br />
              <img
                className="review-img"
                src={review.review_img_url}
                alt={review.title}
              ></img>
              <div>
                <p>{review.review_body}</p>
                <span className="author">
                  Author:{" "}
                  <Link to={`/users/${review.owner}`} className="author-link">
                    {review.owner}
                  </Link>
                </span>
                <span className="date-posted">Date posted: {review.created_at}</span>
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
                onClick={() => {
                  setIsVoted(true);
                  incKudos(review.review_id, { inc_votes: 1 });
                }}
              >
                Kudos: {review.votes}
              </button>
            </section>
          </div>
        );
      })}
    </main>
  );
}
