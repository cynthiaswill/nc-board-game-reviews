import { useState } from "react";
import { editReview } from "../utils/api";

export default function EditComment({ review, setIsEditingReview }) {
  const [newReviewBody, setNewReviewBody] = useState({
    review_body: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    editReview(review.review_id, newReviewBody)
      .then(() => {
        setIsEditingReview(false);
      })
      .catch((err) => console.dir(err));
  };
  return (
    <div>
      <h3>Edit your review below:</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            className="comment-input-box"
            rows="20"
            name="review_body"
            onChange={(event) => {
              setNewReviewBody((current) => {
                return {
                  ...current,
                  review_body: event.target.value,
                };
              });
            }}
            defaultValue={review.review_body}
          />

          <br />
          <br />

          <div className="post-comment-buttons">
            <button
              onClick={() => {
                setIsEditingReview(false);
              }}
            >
              Close
            </button>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
