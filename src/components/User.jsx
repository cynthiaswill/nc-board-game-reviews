import { getUser } from "../utils/api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function User({ user, setUser }) {
  const { username } = useParams();

  useEffect(() => {
    getUser(username)
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="user-container">
      <div key={user.username} className="user-profile">
        <h3>{user.name}</h3>
        <img src={user.avatar_url} alt={user.username} className="user-pic"></img>
        <h3>
          <span>username:</span> {user.username}
        </h3>
      </div>
    </div>
  );
}
