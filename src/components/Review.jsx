import { getReviewById, getComments, incKudos } from "../utils/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostComment from "./PostComment";

export default function Review({ user }) {
  const [review, setReview] = useState({});
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [comments, setComments] = useState([]);
  const [isPosting, setIsPosting] = useState(false);

  const { review_id } = useParams();
  const numArr = [];
  for (let i = 1; i <= 20; i++) {
    numArr.push(i);
  }

  useEffect(() => {
    getReviewById(review_id).then(({ data }) => {
      setReview(data.review);
    });
    getComments({
      review_id: `${review_id}`,
      limit: `${limitPerPage}`,
      p: 1,
    }).then(({ data }) => {
      setComments(data.comments);
    });
  }, [review_id, limitPerPage, isPosting]);

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
            <p className="review-body">{review.review_body}</p>
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
        <section className="button-container">
          <button className="comments-button">Comments: {review.comment_count}</button>
          <button className="edit-review-button">Edit</button>
          <button
            className="kudos-button"
            onClick={() => {
              incKudos(review.review_id, { inc_votes: 1 });
              setReview((current) => {
                return { ...current, votes: current.votes++ };
              });
            }}
          >
            Kudos: {review.votes}
          </button>
        </section>
      </div>
      <section className="comments-container">
        <div>
          <div className="comments-sub-bar">
            <button
              onClick={() => {
                setIsPosting(true);
              }}
              className="add-comment-button"
            >
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

          <div id="comment-typing-box">
            {isPosting ? (
              <PostComment user={user} review={review} setIsPosting={setIsPosting} />
            ) : null}
          </div>

          {comments.map((comment) => {
            return (
              <div className="comment-box" key={comment.comment_id}>
                <span className="author">
                  <Link to={`users/${comment.author}`} className="author-link">
                    {comment.author}
                  </Link>{" "}
                  replied:
                </span>
                <p>{comment.body}</p>
                <span className="date-posted">{comment.created_at}</span>
                <div className="button-container">
                  <button className="edit-comment-button">Edit</button>
                  <button className="delete-comment-button">Delete</button>
                  <button className="kudos-button">Likes: {comment.votes}</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
