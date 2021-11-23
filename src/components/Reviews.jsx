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
      <p>
        <h3>{category.slug}:</h3> <span>{category.description}</span>
      </p>
      {reviews.map((review) => {
        return (
          <div key={review.review_id} className="review-item">
            <h3>{review.title}</h3>
            <p>
              Category: {review.category} Designer: {review.designer}
            </p>
            <p></p>
            <p>{review.review_body}</p>
            <p>Author: {review.owner}</p>
            <p>Date posted: {review.created_at}</p>
          </div>
        );
      })}
    </main>
  );
}
