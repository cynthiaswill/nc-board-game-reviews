import { useEffect, useState, useContext } from "react";
import { getUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";

export default function CommentAuthorIcon({ comment }) {
  const [viewedUser, setViewedUser] = useState({});
  const { setError } = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUser(comment.author)
      .then(({ data }) => {
        setViewedUser(data.user);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
  }, [comment, setError, navigate]);

  return (
    <>
      <img className="user-icon" src={viewedUser.avatar_url} alt={comment.author} />
    </>
  );
}
