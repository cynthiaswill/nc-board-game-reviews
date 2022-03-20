import "../styles/Review.css";
import { getReviewById, deleteReviewById, getUser } from "../utils/api";
import { useEffect, useState, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PostComment from "./PostComment";
import EditComment from "./EditComment";
import EditReview from "./EditReview";
import Kudos from "./Kudos";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";
import { ParticleContext } from "../contexts/ParticleContext";
import { numArr, particleOptions, setVisibility } from "../utils/utils";
import Comments from "./Comments";
import {
  FaRegCommentAlt,
  FaRegEdit,
  FaRegTrashAlt,
  FaRegCalendarAlt,
  FaPenNib,
} from "react-icons/fa";
import { BiCommentAdd } from "react-icons/bi";
import WatchToggle from "./WatchToggle";
import SideMenu from "./SideMenu";
import ProgressBar from "./ProgressBar";

export default function Review() {
  const { user, isLogged } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const { setParticleOps } = useContext(ParticleContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState({});
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [comments, setComments] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [toBeEditedComment, setToBeEditedComment] = useState({});
  const [isReloading, setIsReloading] = useState(false);
  const [page, setPage] = useState(1);
  const [viewedUser, setViewedUser] = useState({});

  const { review_id } = useParams();
  const servicesRef = useRef(null);
  const openWindowRef = useRef(null);

  const gotoServices = () => servicesRef.current.scrollIntoView({ behavior: "smooth" });

  const gotoEditReview = () => {
    openWindowRef.current.scrollIntoView({ behavior: "smooth" });
    setIsEditingReview(true);
    setIsPosting(false);
    setIsEditingComment(false);
  };

  const gotoAddComment = () => {
    openWindowRef.current.scrollIntoView({ behavior: "smooth" });
    setIsPosting(true);
    setIsEditingReview(false);
    setIsEditingComment(false);
  };

  const deleteReview = () => {
    deleteReviewById(review_id);
    navigate("/reviews");
  };

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);
    setParticleOps(particleOptions);
    getReviewById(review_id)
      .then(({ data }) => {
        if (isSubscribed) {
          setReview(data.review);
          setIsLoading(false);
          setIsReloading(false);
          return data.review.owner;
        }
      })
      .then((owner) => {
        getUser(owner)
          .then(({ data }) => {
            isSubscribed && setViewedUser(data.user);
          })
          .catch((err) => {
            if (err) {
              setError(err.response.status);
              navigate("/error");
            }
          });
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
    return () => (isSubscribed = false);
  }, [review_id, setError, isReloading, setParticleOps, navigate]);

  if (isLoading === true) {
    return (
      <div
        style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column" }}
      >
        <h2>
          <i className="fa fa-cog fa-spin" style={{ fontSize: 20 }} /> Loading...
        </h2>
        <div style={{ alignSelf: "center" }}>
          <ProgressBar />
        </div>
      </div>
    );
  }

  return (
    <main className="main">
      <div className="mainView">
        <div key={review.review_id} className="single-review-item">
          <section className="single-review-content">
            <div className="review-title-row">
              <h3 className="review-title-in-review">{review.title}</h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <WatchToggle review={review} className="watch-toggle" />
              </div>
            </div>
            <span className="slug-name">Category: {review.category}</span>{" "}
            <span className="designer-name">Designer: {review.designer}</span>
            <br />
            <img
              className="single-review-img"
              src={review.review_img_url}
              alt={review.title}
            />
            <div>
              <p>{review.review_body}</p>
              <div className="author">
                Author:{" "}
                <Link to={`/users/${review.owner}`} className="author-link">
                  {review.owner}
                  <img
                    className="user-icon"
                    src={viewedUser.avatar_url}
                    alt={viewedUser.username}
                  />
                </Link>
                <br />
                <span className="data-stamp">
                  <FaRegCalendarAlt />{" "}
                  {review.created_at.slice(0, 19).replaceAll("T", " at ")} <FaPenNib />
                </span>
              </div>
              <br />
            </div>
          </section>
          <section>
            <button className="comments-button" onClick={gotoServices}>
              <FaRegCommentAlt className="commentIcon" /> {review.comment_count}
              <span className="commentsTooltipText">scroll to comments</span>
            </button>
            <button
              className="edit-review-button"
              disabled={!!(user.username !== review.owner)}
              style={{
                visibility: `${setVisibility(!!(user.username !== review.owner))}`,
              }}
              onClick={gotoEditReview}
            >
              <FaRegEdit className="commentIcon" />
              <span className="editTooltipText">edit this review</span>
            </button>
            <button
              className="delete-review-button"
              disabled={!!(user.username !== review.owner)}
              style={{
                visibility: `${setVisibility(!!(user.username !== review.owner))}`,
              }}
              onClick={deleteReview}
            >
              <FaRegTrashAlt className="commentIcon" />
              <span className="deleteTooltipText">delete this review</span>
            </button>
            <Kudos review={review} />
          </section>
        </div>
        <section style={{ marginLeft: "5px", marginRight: "5px" }}>
          <div ref={servicesRef}>
            <div className="comments-sub-bar">
              <button onClick={gotoAddComment} className="add-comment-button">
                <BiCommentAdd style={{ fontSize: 15 }} className="commentIcon" /> comment
                <span className="commentsTooltipText">post new comment</span>
              </button>
              <div>
                <button
                  className="page-button"
                  disabled={page === 1}
                  onClick={() => {
                    setPage((curr) => {
                      return curr - 1;
                    });
                  }}
                >
                  &lt;&lt;
                </button>
                <span className="page-number">Page {page} </span>
                <button
                  className="page-button"
                  disabled={review.comment_count <= limitPerPage * page}
                  onClick={() => {
                    setPage((curr) => {
                      return curr + 1;
                    });
                  }}
                >
                  &gt;&gt;
                </button>
              </div>
              <select
                className="comments-limit-option"
                style={{ borderRadius: 5 }}
                onChange={(e) => {
                  setLimitPerPage(e.target.value);
                  setPage(1);
                }}
              >
                <option value="5" default hidden>
                  5 per page
                </option>
                {numArr.map((num) => {
                  return (
                    <option key={num} value={num}>
                      {num} per page
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="comment-typing-box" ref={openWindowRef}>
              {isLogged && isEditingReview ? (
                <EditReview
                  review={review}
                  setIsEditingReview={setIsEditingReview}
                  setIsReloading={setIsReloading}
                />
              ) : null}
              {isPosting ? (
                <PostComment
                  user={user}
                  isLogged={isLogged}
                  review={review}
                  setIsPosting={setIsPosting}
                />
              ) : null}
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
              setIsEditingReview={setIsEditingReview}
              openWindowRef={openWindowRef}
              page={page}
            />
          </div>
        </section>
      </div>
      <div className="sideMenu">
        <SideMenu className="sideMenuContainer" />
      </div>
    </main>
  );
}
