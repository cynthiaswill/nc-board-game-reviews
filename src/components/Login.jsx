import { useEffect, useState } from "react";
import { getUsers } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser, setVisibility, setIsLogged }) {
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
            <img
              src="https://source.unsplash.com/random/300x200"
              alt={user.username}
              className="user-pic"
            ></img>
            <h3>{user.username}</h3>
            <button
              onClick={() => {
                setUser(user);
                setVisibility("hidden");
                setIsLogged(true);
                navigate("/");
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
