export default function WatchSwitch({ isWatchedOnly, setIsWatchedOnly }) {
  return (
    <button
      className="watchSwitch"
      onClick={() => {
        isWatchedOnly ? setIsWatchedOnly(false) : setIsWatchedOnly(true);
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
        <span className="viewModeChatTooltip">switch to full list</span>
      ) : (
        <span className="viewModeUsersTooltip">switch to watched list</span>
      )}
    </button>
  );
}
