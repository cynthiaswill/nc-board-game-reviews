import "../styles/Review.css";
import { incLikes, getLikesList, voteComment } from "../utils/api";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaHeart } from "react-icons/fa";

export default function Likes({ comment }) {
  const { user, isLogged } = useContext(UserContext);
  const [addedLikes, setAddedLikes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    getLikesList(comment.comment_id).then(({ data }) => {
      if (isSubscribed && isLogged && data.list.includes(user.username)) {
        setHasVoted(true);
      }
    });
    return () => (isSubscribed = false);
  }, [isLogged, comment, user]);

  return (
    <>
      <button
        className="likes-button"
        disabled={!!(user.username === comment.author) || hasVoted}
        onClick={() => {
          setAddedLikes((current) => {
            return current + 1;
          });
          incLikes(comment.comment_id, { inc_votes: 1 });
          isLogged && voteComment(comment.comment_id, { username: `${user.username}` });
          setHasVoted(true);
        }}
      >
        <FaHeart className="starIcon" /> {comment.votes + addedLikes}
        <span className="likesTooltipText">click to heart this comment</span>
        <span className="likesDisabledTooltipText">you already hearted this comment</span>
      </button>
    </>
  );
}
