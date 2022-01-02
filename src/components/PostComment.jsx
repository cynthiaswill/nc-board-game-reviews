import { useState, useContext } from "react";
import { postComment } from "../utils/api";
import { ErrorContext } from "../contexts/ErrorContext";
import { useNavigate } from "react-router-dom";

export default function PostComment({ user, review, setIsPosting }) {
  const { setError } = useContext(ErrorContext);
  const [newComment, setNewComment] = useState({
    username: `${user.username}`,
    body: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(review.review_id, newComment)
      .then(() => {
        setIsPosting(false);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("*");
        }
      });
  };

  return (
    <div className="comment-typing-box-wrapper">
      <h3>Write a new comment below:</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            className="comment-input-box"
            rows="10"
            placeholder="Write your comment here..."
            name="body"
            onChange={(event) => {
              setNewComment((current) => {
                return {
                  ...current,
                  body: event.target.value,
                };
              });
            }}
            required
          />
          <br />
          <br />
          <div className="post-comment-buttons">
            <button
              onClick={() => {
                setIsPosting(false);
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
