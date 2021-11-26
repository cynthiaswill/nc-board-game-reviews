import { useState } from "react";
import { postComment } from "../utils/api";

export default function PostComment({ user, review, setIsPosting }) {
  const [newComment, setNewComment] = useState({
    username: `${user.username}`,
    body: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(review.review_id, newComment).then(() => {
      setIsPosting(false);
    });
  };

  return (
    <div>
      <h3>Write a new comment below:</h3>
      <form id="post-comment-form" onSubmit={handleSubmit}>
        <div className="post-comment-form">
          <textarea
            id="comment-input-box"
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
          />

          <br />
          <br />

          <div id="post-comment-buttons">
            <button
              onClick={() => {
                setIsPosting(false);
              }}
            >
              Close
            </button>
            <button id="new-comment-submit-button" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
