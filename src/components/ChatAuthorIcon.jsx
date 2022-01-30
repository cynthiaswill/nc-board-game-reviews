import { useEffect, useState, useContext } from "react";
import { getUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";

export default function ChatAuthorIcon({ msg }) {
  const [viewedUser, setViewedUser] = useState({});
  const { setError } = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (msg.username !== "anonymous") {
      getUser(msg.username)
        .then(({ data }) => {
          setViewedUser(data.user);
        })
        .catch((err) => {
          if (err) {
            setError(err.response.status);
            navigate("/error");
          }
        });
    }
  }, [msg, setError, navigate]);

  return (
    <>
      <img
        src={viewedUser.avatar_url || "https://cdn.onlinewebfonts.com/svg/img_181369.png"}
        alt=""
        style={{ maxHeight: 15, maxWidth: 15, borderRadius: "50%" }}
      />
    </>
  );
}
