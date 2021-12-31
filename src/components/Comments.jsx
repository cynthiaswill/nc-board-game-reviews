import "../styles/Review.css";
import { getComments } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteComment, incLikes } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";

export default function Comments({
  comments,
  setComments,
  isEditingComment,
  setIsEditingComment,
  toBeEditedComment,
  setToBeEditedComment,
  review_id,
  limitPerPage,
  isPosting,
  setIsPosting,
}) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    getComments({
      review_id: `${review_id}`,
      limit: `${limitPerPage}`,
      p: 1,
    })
      .then(({ data }) => {
        setComments(data.comments);
        setIsDeleting(false);
        setIsVoted(false);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("*");
        }
      });
  }, [
    setIsVoted,
    limitPerPage,
    navigate,
    isDeleting,
    isVoted,
    isPosting,
    isEditingComment,
    toBeEditedComment,
    review_id,
    setComments,
    setError,
    setIsPosting,
  ]);

  return (
    <>
      {comments.map((comment) => {
        return (
          <div className="comment-box" key={comment.comment_id}>
            <span className="author">
              <Link to={`/users/${comment.author}`} className="author-link">
                {comment.author}
              </Link>{" "}
              replied:
            </span>
            <p>{comment.body}</p>
            <span className="date-posted">{comment.created_at}</span>

            <div className="button-container">
              <button
                className="edit-comment-button"
                disabled={!!(user.username !== comment.author)}
                onClick={() => {
                  setIsEditingComment(true);
                  setToBeEditedComment(comment);
                }}
              >
                Edit
              </button>
              <button
                disabled={!!(user.username !== comment.author)}
                onClick={() => {
                  deleteComment(comment.comment_id)
                    .then(() => {
                      setIsDeleting(true);
                    })
                    .catch((err) => {
                      if (err) {
                        setError(err.response.status);
                        navigate("*");
                      }
                    });
                }}
                className="delete-comment-button"
              >
                Delete
              </button>
              <button
                className="likes-button"
                disabled={!!(user.username === comment.author)}
                onClick={() => {
                  setIsVoted(true);
                  incLikes(comment.comment_id, { inc_votes: 1 });
                }}
              >
                Likes: {comment.votes}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
