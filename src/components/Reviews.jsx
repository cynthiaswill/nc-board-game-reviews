import { getReviews } from "./utils/api";
import { useEffect, useState } from "react";

export default function Reviews({ catQueries }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log(catQueries);
    getReviews(...catQueries)
      .then(({ data }) => {
        console.log(reviews);
        setReviews(data.reviews);
      })
      .catch((err) => console.log(err));
  }, [catQueries]);

  return (
    <main>
      Reviews
      {reviews.map((review) => {
        return (
          <div>
            <h3>{review.title}</h3>
            <p>{review.category}</p>
            <p>{review.review_body}</p>
          </div>
        );
      })}
    </main>
  );
}
