import { getReviews } from "./utils/api";
import { useEffect, useState } from "react";

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

  return (
    <main className="main">
      <h3 className="category-title">{category.slug}:</h3>
      <p className="category-description">{category.description}</p>
      {reviews.map((review) => {
        return (
          <div key={review.review_id} className="review-item">
            <h3>{review.title}</h3>
            <p>
              Category: {review.category} Designer: {review.designer}
            </p>
            <p>{review.review_body}</p>
            <span>Author: {review.owner}</span>
            <span>Date posted: {review.created_at}</span>
          </div>
        );
      })}
    </main>
  );
}
