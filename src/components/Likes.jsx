import "../styles/Review.css";
import { incLikes } from "../utils/api";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Likes({ comment }) {
  const { user } = useContext(UserContext);
  const [addedLikes, setAddedLikes] = useState(0);

  return (
    <>
      <button
        className="likes-button"
        disabled={!!(user.username === comment.author)}
        onClick={() => {
          setAddedLikes((current) => {
            return current + 1;
          });
          incLikes(comment.comment_id, { inc_votes: 1 });
        }}
      >
        Likes: {comment.votes + addedLikes}
      </button>
    </>
  );
}
