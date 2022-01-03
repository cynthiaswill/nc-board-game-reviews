import "../styles/Login.css";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";

export default function UserCardInList({ userInList }) {
  const navigate = useNavigate();
  const [viewedUser, setViewedUser] = useState({});
  const { setUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    getUser(userInList.username)
      .then(({ data }) => {
        setViewedUser(data.user);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
  }, [userInList.username]);

  return (
    <div key={userInList.username} className="user-card">
      <div>
        <img
          src={viewedUser.avatar_url || "https://source.unsplash.com/random/300x200"}
          alt={userInList.username}
          className="user-pic"
        ></img>
        <br />
        <Link to={`/users/${userInList.username}`}>{userInList.username}</Link>
      </div>
      <br />
      <button
        className="user-login-button"
        onClick={() => {
          setUser(viewedUser);
          navigate("/reviews");
        }}
      >
        Login as {viewedUser.username}
      </button>
    </div>
  );
}
