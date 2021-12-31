import "../styles/Review.css";
import { getReviewById, incKudos, deleteReviewById } from "../utils/api";
import { useEffect, useState, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PostComment from "./PostComment";
import EditComment from "./EditComment";
import EditReview from "./EditReview";
import { UserContext } from "../contexts/UserContext";
import { numArr } from "../utils/utils";
import { ErrorContext } from "../contexts/ErrorContext";
import Comments from "./Comments";

export default function Review() {
  const { user, isLogged } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [addedKudos, setAddedKudos] = useState(0);
  const [review, setReview] = useState({});
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [comments, setComments] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [toBeEditedComment, setToBeEditedComment] = useState({});
  const [isReloading, setIsReloading] = useState(false);

  const { review_id } = useParams();
  const servicesRef = useRef(null);
  const editReviewRef = useRef(null);
  const addCommentRef = useRef(null);
  const editCommentRef = useRef(null);

  const gotoServices = () => servicesRef.current.scrollIntoView({ behavior: "smooth" });

  const gotoEditReview = () => {
    editReviewRef.current.scrollIntoView({ behavior: "smooth" });
    setIsEditingReview(true);
  };

  const gotoAddComment = () => {
    addCommentRef.current.scrollIntoView({ behavior: "smooth" });
    setIsPosting(true);
  };

  const deleteReview = () => {
    deleteReviewById(review_id);
    navigate("/reviews");
  };

  useEffect(() => {
    setIsLoading(true);
    getReviewById(review_id)
      .then(({ data }) => {
        setReview(data.review);
        setIsLoading(false);
        setIsReloading(false);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("*");
        }
      });
  }, [review_id, setError, isReloading, navigate]);

  if (isLoading === true) {
    return <h2>Loading...</h2>;
  }

  return (
    <main className="main">
      <div key={review.review_id} className="single-review-item">
        <section className="single-review-content">
          <h3 className="review-title">{review.title}</h3>
          <span className="slug-name">Category: {review.category}</span>{" "}
          <span className="designer-name">Designer: {review.designer}</span>
          <br />
          <img
            className="single-review-img"
            src={review.review_img_url}
            alt={review.title}
          ></img>
          <div>
            <p>{review.review_body}</p>
            <div className="author">
              Author:{" "}
              <Link to={`/users/${review.owner}`} className="author-link">
                {review.owner}
              </Link>
              <br />
              <span className="data-stamp">Date posted: {review.created_at}</span>
            </div>
            <br />
          </div>
        </section>
        <section>
          <button className="comments-button" onClick={gotoServices}>
            Comments: {review.comment_count}
          </button>
          <button
            className="edit-review-button"
            disabled={!!(user.username !== review.owner)}
            onClick={gotoEditReview}
          >
            Edit
          </button>
          <button
            className="delete-review-button"
            disabled={!!(user.username !== review.owner)}
            onClick={deleteReview}
          >
            Delete
          </button>
          <button
            className="kudos-button"
            disabled={!!(user.username === review.owner)}
            onClick={() => {
              setAddedKudos((current) => {
                return current + 1;
              });
              incKudos(review.review_id, { inc_votes: 1 });
            }}
          >
            Kudos: {review.votes + addedKudos}
          </button>
        </section>
      </div>
      <section>
        <div ref={servicesRef}>
          <div className="comments-sub-bar">
            <button onClick={gotoAddComment} className="add-comment-button">
              Add Comment
            </button>
            <select
              className="comments-limit-option"
              onChange={(e) => {
                setLimitPerPage(e.target.value);
              }}
            >
              <option value="10" default>
                comments per page
              </option>
              {numArr.map((num) => {
                return (
                  <option key={num} value={num}>
                    {num}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="comment-typing-box" ref={editReviewRef}>
            {isLogged && isEditingReview ? (
              <EditReview
                review={review}
                setIsEditingReview={setIsEditingReview}
                setIsReloading={setIsReloading}
              />
            ) : null}
          </div>
          <div className="comment-typing-box" ref={addCommentRef}>
            {isPosting ? (
              <PostComment user={user} review={review} setIsPosting={setIsPosting} />
            ) : null}
          </div>

          <div className="comment-typing-box" ref={editCommentRef}>
            {isLogged && isEditingComment ? (
              <EditComment
                user={user}
                toBeEditedComment={toBeEditedComment}
                setIsEditingComment={setIsEditingComment}
              />
            ) : null}
          </div>
          <Comments
            comments={comments}
            setComments={setComments}
            isEditingComment={isEditingComment}
            setIsEditingComment={setIsEditingComment}
            toBeEditedComment={toBeEditedComment}
            setToBeEditedComment={setToBeEditedComment}
            review_id={review_id}
            limitPerPage={limitPerPage}
            isPosting={isPosting}
            setIsPosting={setIsPosting}
            editCommentRef={editCommentRef}
          />
        </div>
      </section>
    </main>
  );
}
