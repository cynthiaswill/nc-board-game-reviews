import { useState } from "react";
import { editComment } from "../utils/api";

export default function EditComment({ user, review, setIsEditing }) {
  const [newComment, setNewComment] = useState({
    username: `${user.username}`,
    body: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    editComment(review.review_id, newComment).then(() => {
      setIsEditing(false);
    });
  };

  return (
    <div id="comment-typing-box-wrapper">
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
                setIsEditing(false);
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
