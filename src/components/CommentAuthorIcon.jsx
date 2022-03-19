import { useEffect, useState, useContext } from "react";
import { getUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";

export default function CommentAuthorIcon({ comment }) {
  const [viewedUser, setViewedUser] = useState({});
  const { setError } = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    let isSubscribed = true;
    getUser(comment.author)
      .then(({ data }) => {
        isSubscribed && setViewedUser(data.user);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
    return () => {
      isSubscribed = false;
    };
  }, [comment, setError, navigate]);

  return (
    <>
      <img className="user-icon" src={viewedUser.avatar_url} alt={comment.author} />
    </>
  );
}
