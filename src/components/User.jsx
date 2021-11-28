import "../styles/User.css";
import { getUser } from "../utils/api";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function User({ user, setUser }) {
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    getUser(username)
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((err) => console.log(err));
  }, [username, setUser]);

  return (
    <div className="user-container">
      <div key={user.username} className="user-profile">
        <h3>{user.name}</h3>
        <img src={user.avatar_url} alt={user.username} className="user-pic"></img>
        <h3>
          <span>username:</span> {user.username}
        </h3>
        <button
          className="single-user-login-button"
          onClick={() => {
            setUser(user);
            navigate("/reviews");
          }}
        >
          Login as {user.username}
        </button>
      </div>
    </div>
  );
}
