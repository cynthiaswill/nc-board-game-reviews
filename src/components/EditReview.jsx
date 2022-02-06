import { useState, useContext } from "react";
import { editReview } from "../utils/api";
import { ErrorContext } from "../contexts/ErrorContext";
import { useNavigate } from "react-router-dom";

export default function EditComment({ review, setIsEditingReview, setIsReloading }) {
  const [newReviewBody, setNewReviewBody] = useState({
    review_body: "",
  });
  const { setError } = useContext(ErrorContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    editReview(review.review_id, newReviewBody)
      .then(() => {
        setIsEditingReview(false);
        setIsReloading(true);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
  };

  return (
    <div style={{ animation: "phaseIn 0.5s ease" }}>
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
