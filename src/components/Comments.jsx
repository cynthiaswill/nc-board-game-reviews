import "../styles/Review.css";
import { getComments, deleteComment } from "../utils/api";
import { setVisibility } from "../utils/utils";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";
import { FaRegEdit, FaRegTrashAlt, FaPenNib } from "react-icons/fa";
import Likes from "./Likes";
import CommentAuthorIcon from "./CommentAuthorIcon";

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
  setIsEditingReview,
  openWindowRef,
  page,
}) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getComments({
      review_id: `${review_id}`,
      limit: `${limitPerPage}`,
      p: `${page}`,
    })
      .then(({ data }) => {
        setComments(data.comments);
        setIsDeleting(false);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
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
    page,
  ]);

  return (
    <>
      {comments.map((comment) => {
        return (
          <div className="comment-box" key={comment.comment_id}>
            <span className="author">
              <Link to={`/users/${comment.author}`} className="author-link">
                <CommentAuthorIcon comment={comment} />
                {comment.author}
              </Link>{" "}
              said:
            </span>
            <div style={{ paddingLeft: "9px" }}>
              <p>{comment.body}</p>
              <span className="date-posted">
                <FaPenNib /> {comment.created_at.slice(0, 19).replaceAll("T", " at ")}
              </span>
            </div>

            <div className="button-container">
              <button
                className="edit-comment-button"
                disabled={!!(user.username !== comment.author)}
                style={{
                  visibility: `${setVisibility(!!(user.username !== comment.author))}`,
                }}
                onClick={() => {
                  setIsEditingComment(true);
                  setToBeEditedComment(comment);
                  setIsPosting(false);
                  setIsEditingReview(false);
                  openWindowRef.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <FaRegEdit className="commentIcon" />
                <span className="editCommentTooltipText">edit this comment</span>
              </button>
              <button
                disabled={!!(user.username !== comment.author)}
                style={{
                  visibility: `${setVisibility(!!(user.username !== comment.author))}`,
                }}
                onClick={() => {
                  deleteComment(comment.comment_id)
                    .then(() => {
                      setIsDeleting(true);
                    })
                    .catch((err) => {
                      if (err) {
                        setError(err.response.status);
                        navigate("/error");
                      }
                    });
                }}
                className="delete-comment-button"
              >
                <FaRegTrashAlt className="commentIcon" />
                <span className="deleteCommentTooltipText">delete this comment</span>
              </button>
              <Likes comment={comment} />
            </div>
          </div>
        );
      })}
    </>
  );
}
