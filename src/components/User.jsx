import "../styles/User.css";
import { getUser } from "../utils/api";
import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";

export default function User() {
  const { setUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const navigate = useNavigate();
  const { username } = useParams();
  const [viewedUser, setViewedUser] = useState({});

  useEffect(() => {
    getUser(username)
      .then(({ data }) => {
        setViewedUser(data.user);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
  }, [username, setError, navigate]);

  return (
    <div className="user-container">
      <div key={viewedUser.username} className="user-profile">
        <h3>{viewedUser.name}</h3>
        <img
          src={viewedUser.avatar_url}
          alt={viewedUser.username}
          className="user-pic"
        ></img>
        <h3>
          <span>username:</span> {viewedUser.username}
        </h3>
        <button
          className="single-user-login-button"
          onClick={() => {
            setUser(viewedUser);
            navigate("/reviews");
          }}
        >
          Login as {viewedUser.username}
        </button>
      </div>
    </div>
  );
}
