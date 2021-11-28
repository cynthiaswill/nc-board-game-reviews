import { useState } from "react";
import { editComment } from "../utils/api";

export default function EditComment({ user, toBeEditedComment, setIsEditingComment }) {
  const [newComment, setNewComment] = useState({
    username: `${user.username}`,
    body: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    editComment(toBeEditedComment.comment_id, newComment)
      .then(() => {
        setIsEditingComment(false);
      })
      .catch((err) => console.dir(err));
  };
  console.log(toBeEditedComment);
  return (
    <div className="comment-typing-box-wrapper">
      <h3>Edit your comment below:</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            className="comment-input-box"
            rows="10"
            name="body"
            onChange={(event) => {
              setNewComment((current) => {
                return {
                  ...current,
                  body: event.target.value,
                };
              });
            }}
            defaultValue={toBeEditedComment.body}
          />
          <br />
          <br />
          <div className="post-comment-buttons">
            <button
              onClick={() => {
                setIsEditingComment(false);
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
