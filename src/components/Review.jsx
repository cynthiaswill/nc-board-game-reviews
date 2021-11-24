import { getReviewById } from "../utils/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Review() {
  const [review, setReview] = useState({});
  const { review_id } = useParams();

  useEffect(() => {
    getReviewById(review_id).then(({ data }) => {
      setReview(data.review);
    });
  }, []);

  return (
    <main className="main">
      <div key={review.review_id} className="single-review-item">
        <section className="single-review-content">
          <h3 className="review-title">{review.title}</h3>
          <span className="slug-name">Category: {review.category}</span>{" "}
          <span className="designer-name">Designer: {review.designer}</span>
          <br />
          <img
            className="single-review-img"
            src={review.review_img_url}
            alt={review.title}
          ></img>
          <div>
            <p className="review-body">{review.review_body}</p>
            <span className="author">
              Author:{" "}
              <Link to="/" className="author-link">
                {review.owner}
              </Link>
            </span>
            <span className="date-posted">Date posted: {review.created_at}</span>
            <br />
          </div>
        </section>
        <section className="button-container">
          <button className="comments-button">Comments: {review.comment_count}</button>
          <button className="kudos-button">Kudos: {review.votes}</button>
        </section>
      </div>
    </main>
  );
}
