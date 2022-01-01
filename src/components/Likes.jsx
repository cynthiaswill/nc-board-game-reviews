import "../styles/Review.css";
import { incLikes } from "../utils/api";

export default function Likes() {
  return (
    <>
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
    </>
  );
}
