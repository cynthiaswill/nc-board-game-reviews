import "../styles/Review.css";
import { getComments } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteComment } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";
import Likes from "./Likes";

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
  editCommentRef,
}) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getComments({
      review_id: `${review_id}`,
      limit: `${limitPerPage}`,
      p: 1,
    })
      .then(({ data }) => {
        setComments(data.comments);
        setIsDeleting(false);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("*");
        }
      });
  }, [
    limitPerPage,
    navigate,
    isDeleting,
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
            <span className="date-posted">
              {comment.created_at.slice(0, 19).replaceAll("T", " at ")}
            </span>

            <div className="button-container">
              <button
                className="edit-comment-button"
                disabled={!!(user.username !== comment.author)}
                onClick={() => {
                  setIsEditingComment(true);
                  setToBeEditedComment(comment);
                  editCommentRef.current.scrollIntoView({ behavior: "smooth" });
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
              <Likes comment={comment} />
            </div>
          </div>
        );
      })}
    </>
  );
}
