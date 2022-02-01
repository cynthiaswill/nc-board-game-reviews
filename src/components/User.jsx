import "../styles/User.css";
import { getUser } from "../utils/api";
import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";
import { ParticleContext } from "../contexts/ParticleContext";
import { OnlineUsersContext } from "../contexts/OnlineUsersContext";
import { particleOptions } from "../utils/utils";

export default function User() {
  const { user, setUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const { setParticleOps } = useContext(ParticleContext);
  const { setOnlineUsers } = useContext(OnlineUsersContext);
  const navigate = useNavigate();
  const { username } = useParams();
  const [viewedUser, setViewedUser] = useState({});

  useEffect(() => {
    setParticleOps(particleOptions);
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
  }, [username, setError, setParticleOps, navigate]);

  const handleSignIn = () => {
    setOnlineUsers((prev) => {
      return prev.filter((name) => name !== (user.username || viewedUser.username));
    });
    setUser(viewedUser);
    setOnlineUsers((previous) => {
      return [...previous, viewedUser.username];
    });
    navigate("/reviews");
  };

  return (
    <div className="user-container">
      <div key={viewedUser.username} className="user-profile">
        <h3>{viewedUser.name}</h3>
        <img
          src={viewedUser.avatar_url || "https://source.unsplash.com/random/300x200"}
          alt={viewedUser.username}
          className="user-pic"
        ></img>
        <h3>
          <span>username:</span> {viewedUser.username}
        </h3>
        <button className="single-user-login-button" onClick={handleSignIn}>
          Login as {viewedUser.username}
        </button>
      </div>
    </div>
  );
}
