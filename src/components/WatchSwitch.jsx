import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { CatQueriesContext } from "../contexts/CatQueriesContext";

export default function WatchSwitch({ isWatchedOnly, setIsWatchedOnly }) {
  const { isLogged } = useContext(UserContext);
  const { setCatQueries } = useContext(CatQueriesContext);

  return (
    <button
      disabled={!isLogged}
      className="watchSwitch"
      onClick={() => {
        if (isWatchedOnly) {
          setIsWatchedOnly(false);
          setCatQueries((current) => {
            return { ...current, limit: 10, p: 1 };
          });
        } else {
          setIsWatchedOnly(true);
          setCatQueries((current) => {
            return { ...current, limit: 99, p: 1 };
          });
        }
      }}
    >
      <i
        className="fas fa-eye"
        style={
          isWatchedOnly
            ? { color: "blue", fontWeight: "bold", fontSize: 14 }
            : { fontSize: 10 }
        }
      />{" "}
      /{" "}
      <i
        className="fas fa-list"
        style={
          !isWatchedOnly
            ? { color: "blue", fontWeight: "bold", fontSize: 14 }
            : { fontSize: 10 }
        }
      />
      {isWatchedOnly ? (
        <span className="watchedTooltip">switch to full list</span>
      ) : (
        <span className="fullListTooltip">switch to watched only</span>
      )}
    </button>
  );
}
