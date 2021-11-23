import { getReviews } from "./utils/api";
import { useEffect, useState } from "react";

export default function Reviews({ catQueries }) {
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
    <main>
      Reviews
      {reviews.map((review) => {
        return (
          <div key={review.review_id}>
            <h3>{review.title}</h3>
            <h4>{review.category}</h4>
            <p>{review.designer}</p>
            <p>{review.created_at}</p>
            <p>{review.owner}</p>
            <p>{review.review_body}</p>
          </div>
        );
      })}
    </main>
  );
}
