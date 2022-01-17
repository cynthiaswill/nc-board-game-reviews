import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function WatchToggle() {
  const [isWatched, setIsWatched] = useState(false);

  return (
    <>
      {isWatched ? (
        <button
          onClick={() => {
            setIsWatched(false);
          }}
          className="watch-button"
        >
          <FaEye className="eyeIcon" />
          <span className="openedEyeTooltip">click to unwatch this review</span>
        </button>
      ) : (
        <button
          onClick={() => {
            setIsWatched(true);
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
