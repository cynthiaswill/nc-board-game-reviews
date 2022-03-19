import { useEffect, useState, useContext } from "react";
import { getUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";

export default function UserIcon({ name, offlineToggle }) {
  const [viewedUser, setViewedUser] = useState({});
  const { setError } = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    let isSubscribed = true;
    if (name !== "anonymous") {
      getUser(name)
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
  }, [name, setError, navigate]);

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
