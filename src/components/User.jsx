import "../styles/User.css";
import { getUser } from "../utils/api";
import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";

export default function User() {
  const { user, setUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getUser(username)
      .then(({ data }) => {
        setUser(data.user);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("*");
        }
      });
  }, [username, setUser, setError, navigate]);

  if (isLoading === true) {
    return <h2>Loading...</h2>;
  }
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
