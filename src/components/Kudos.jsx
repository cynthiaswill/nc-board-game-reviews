import "../styles/Reviews.css";
import { incKudos } from "../utils/api";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Kudos({ review }) {
  const { user } = useContext(UserContext);
  const [addedKudos, setAddedKudos] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  return (
    <>
      <button
        className="kudos-button"
        disabled={!!(user.username === review.owner) || hasVoted}
        onClick={() => {
          setAddedKudos((current) => {
            return current + 1;
          });
          incKudos(review.review_id, { inc_votes: 1 });
          setHasVoted(true);
        }}
      >
        Kudos: {review.votes + addedKudos}
      </button>
    </>
  );
}
