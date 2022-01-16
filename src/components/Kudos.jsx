import "../styles/Reviews.css";
import { incKudos } from "../utils/api";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { FaRegStar } from "react-icons/fa";

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
        <FaRegStar className="starIcon" /> {review.votes + addedKudos}
        <span className="kudosTooltipText">click to vote this review</span>
        <span className="kudosDisabledTooltipText">you already voted this review</span>
      </button>
    </>
  );
}
