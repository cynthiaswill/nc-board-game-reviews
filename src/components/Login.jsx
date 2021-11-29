import "../styles/Login.css";
import { useEffect, useState, useContext } from "react";
import { getUsers } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then(({ data }) => {
        setUsers(data.users);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("*");
        }
      });
  }, [setError, navigate]);

  return (
    <div className="login-container">
      <h3 className="login-title">Please choose an account to log in:</h3>
      <section className="users-container">
        {users.map((user) => {
          return (
            <div key={user.username} className="user-card">
              <div>
                <img
                  src="https://source.unsplash.com/random/300x200"
                  alt={user.username}
                  className="user-pic"
                ></img>
                <br />
                <Link to={`/users/${user.username}`}>{user.username}</Link>
              </div>
              <br />
              <button
                className="user-login-button"
                onClick={() => {
                  setUser(user);
                  navigate("/reviews");
                }}
              >
                Login as {user.username}
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
}
