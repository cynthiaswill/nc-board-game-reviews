import { getReviews } from "../utils/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Reviews({ catQueries, category }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log(catQueries, "queries");
    getReviews(catQueries)
      .then(({ data }) => {
        setReviews(data.reviews);
      })
      .catch((err) => console.log(err));
  }, [catQueries]);
  console.log(category);
  return (
    <main className="main">
      <h3 className="category-title">{category.slug}:</h3>
      <p className="category-description">{category.description}</p>
      {reviews.map((review) => {
        return (
          <div key={review.review_id} className="review-item">
            <h3>
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
            <p></p>
            <p className="review-body">{review.review_body}</p>
            <span className="author">Author: {review.owner}</span>
            <span className="date-posted">Date posted: {review.created_at}</span>
          </div>
        );
      })}
    </main>
  );
}
