import { useEffect, useState } from "react";
import { getUsers, getUser } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setUser, setIsLogged }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then(({ data }) => {
      console.log(data);
      setUsers(data.users);
    });
  }, []);

  return (
    <div className="users-container">
      {users.map((user) => {
        return (
          <div key={user.username} className="user-card">
            <div id="user-tag">
              <img
                src="https://source.unsplash.com/random/300x200"
                alt={user.username}
                className="user-pic"
              ></img>
              <br />
              <Link id="user-tag-link" to={`/users/${user.username}`}>
                {user.username}
              </Link>
            </div>
            <br />
            <button
              className="user-login-button"
              onClick={() => {
                setUser(user);
                setIsLogged(true);
                navigate("/reviews");
              }}
            >
              Login as {user.username}
            </button>
          </div>
        );
      })}
    </div>
  );
}
