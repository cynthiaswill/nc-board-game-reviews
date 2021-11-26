import { useState, useEffect } from "react";
import { editComment } from "../utils/api";

export default function EditComment({ user, toBeEditedComment, setIsEditing }) {
  const [newComment, setNewComment] = useState({
    username: `${user.username}`,
    body: "",
  });

  // useEffect(() => {
  //   setIsEditing(false);
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    editComment(toBeEditedComment.comment_id, newComment)
      .then(() => {
        setIsEditing(false);
      })
      .catch((err) => console.dir(err));
  };
  console.log(toBeEditedComment);
  return (
    <div>
      <h3>Edit your comment below:</h3>
      <form onSubmit={handleSubmit}>
        <div className="post-comment-form">
          <textarea
            id="comment-input-box"
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
