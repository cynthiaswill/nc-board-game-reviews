import { useEffect, useState, useContext } from "react";
import { getUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";
import { OnlineUsersContext } from "../contexts/OnlineUsersContext";

export default function ChatAuthorIcon({ msg }) {
  const [viewedUser, setViewedUser] = useState({});
  const { setError } = useContext(ErrorContext);
  const { onlineUsers } = useContext(OnlineUsersContext);
  const navigate = useNavigate();

  useEffect(() => {
    let isSubscribed = true;
    if (msg.username !== "anonymous") {
      getUser(msg.username)
        .then(({ data }) => {
          isSubscribed && setViewedUser(data.user);
        })
        .catch((err) => {
          if (err) {
            setError(err.response.status);
            navigate("/error");
          }
        });
    }
    return () => (isSubscribed = false);
  }, [msg, setError, navigate]);

  return (
    <>
      <img
        src={viewedUser.avatar_url || "https://cdn.onlinewebfonts.com/svg/img_181369.png"}
        alt=""
        style={{ maxHeight: 15, maxWidth: 15, borderRadius: "50%" }}
      />
      &nbsp;
      {onlineUsers.includes(viewedUser.username) ? (
        <div
          className="online-radio"
          style={{
            visibility: msg.welcome ? "hidden" : "visible",
            alignSelf: "center",
          }}
        >
          <i className="fa fa-circle" />
          <span className="online-tooltip">online</span>
        </div>
      ) : (
        <div
          className="offline-radio"
          style={{
            visibility: msg.welcome ? "hidden" : "visible",
            alignSelf: "center",
          }}
        >
          <i className="fa fa-circle" />
          <span className="offline-tooltip">offline</span>
        </div>
      )}
    </>
  );
}
