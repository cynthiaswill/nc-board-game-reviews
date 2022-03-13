import { useContext, useState, useEffect } from "react";
import { getWatcherList, unwatchReview, watchReview } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";

export default function WatchToggle({ review }) {
  const [isWatched, setIsWatched] = useState(false);
  const { user, isLogged } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    getWatcherList(review.review_id).then(({ data }) => {
      if (isLogged && data.list.includes(user.username)) {
        setIsWatched(true);
      }
    });
  }, [isLogged, review, user]);

  return (
    <>
      {isWatched ? (
        <button
          onClick={() => {
            if (isLogged) {
              unwatchReview(review.review_id, { username: `${user.username}` });
              setIsWatched(false);
            } else {
              setError(530);
              navigate("/error");
            }
          }}
          className="watched-button"
        >
          <FaEye className="eyeIcon" />
          <span className="openedEyeTooltip">click to unwatch this review</span>
        </button>
      ) : (
        <button
          onClick={() => {
            if (isLogged) {
              watchReview(review.review_id, { username: `${user.username}` });
              setIsWatched(true);
            } else {
              setError(530);
              navigate("/error");
            }
          }}
          className="watch-button"
        >
          <FaEyeSlash className="eyeIcon" />
          <span className="closedEyeTooltip">click to watch this review</span>
        </button>
      )}
    </>
  );
}
