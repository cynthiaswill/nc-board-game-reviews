import { getReviewById } from "../utils/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Review() {
  const [review, setReview] = useState({});
  const { review_id } = useParams();

  useEffect(() => {
    getReviewById(review_id).then(({ data }) => {
      console.log(data);
    });
  });

  return <main className="main">single review</main>;
}
