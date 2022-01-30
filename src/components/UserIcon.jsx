import { useEffect, useState, useContext } from "react";
import { getUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";

export default function ChatAuthorIcon({ user, offlineToggle }) {
  const [viewedUser, setViewedUser] = useState({});
  const { setError } = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username !== "anonymous") {
      getUser(user.username)
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
  }, [user, setError, navigate]);

  return (
    <>
      <img
        src={viewedUser.avatar_url || "https://cdn.onlinewebfonts.com/svg/img_181369.png"}
        alt=""
        style={{
          height: 15,
          width: 15,
          borderRadius: "50%",
          filter: offlineToggle && "grayscale(100%)",
        }}
      />
    </>
  );
}
