import "../styles/Login.css";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, updateOnlineUsers } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";
import { OnlineUsersContext } from "../contexts/OnlineUsersContext";

export default function UserCardInList({ userInList }) {
  const navigate = useNavigate();
  const [viewedUser, setViewedUser] = useState({});
  const { user, setUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const { onlineUsers, setOnlineUsers } = useContext(OnlineUsersContext);

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
  }, [userInList.username, navigate, setError]);

  const handleSignIn = () => {
    const filteredUsers = [...onlineUsers].filter(
      (name) => name !== (user.username || "anonymous" || viewedUser.username)
    );
    const updatedUsers = [...filteredUsers, viewedUser.username];
    setUser(viewedUser);
    setOnlineUsers([...updatedUsers]);
    updateOnlineUsers({ onlineUsers: [...updatedUsers] });
    navigate("/reviews");
  };

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
      <button className="user-login-button" onClick={handleSignIn}>
        Login as {viewedUser.username}
      </button>
    </div>
  );
}
