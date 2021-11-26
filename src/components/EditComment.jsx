import { useState, useEffect } from "react";
import { editComment } from "../utils/api";

export default function EditComment({ user, comment, setIsEditing }) {
  const [newComment, setNewComment] = useState({
    username: `${user.username}`,
    body: "",
  });

  // useEffect(() => {
  //   setIsEditing(false);
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    editComment(comment.comment_id, newComment).then(() => {
      setIsEditing(false);
    });
  };

  return (
    <div>
      <h3>Edit your comment below:</h3>
      <form onSubmit={handleSubmit}>
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
          >
            {comment.body}
          </textarea>

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
