import { getReviews } from "./utils/api";
import { useEffect, useState } from "react";

export default function Reviews({ catQueries }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(...catQueries)
      .then(({ data }) => {
        console.log(Array.isArray(data.reviews));
        console.log(data);
        console.log(reviews);
        setReviews(data.reviews);
      })
      .catch((err) => console.log(err));
  }, [catQueries]);

  return (
    <main>
      Reviews
      {reviews.map((review) => {
        return <div>{review.title}</div>;
      })}
    </main>
  );
}
