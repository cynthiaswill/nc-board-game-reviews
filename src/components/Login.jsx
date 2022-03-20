import "../styles/Login.css";
import { useEffect, useState, useContext } from "react";
import { getUsers } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";
import { ParticleContext } from "../contexts/ParticleContext";
import UserCardInList from "./UserCardInList";
import { particleOptions } from "../utils/utils";

export default function Login() {
  const { setError } = useContext(ErrorContext);
  const { setParticleOps } = useContext(ParticleContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);
    setParticleOps(particleOptions);
    getUsers()
      .then(({ data }) => {
        if (isSubscribed) {
          setUsers(data.users);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
    return () => (isSubscribed = false);
  }, [setError, setParticleOps, navigate]);

  if (isLoading === true) {
    return (
      <h2>
        <i className="fa fa-cog fa-spin" style={{ fontSize: 20 }} /> Loading...
      </h2>
    );
  }
  return (
    <div className="login-container">
      <h3 className="login-title">Please choose an account to log in:</h3>
      <section className="users-container">
        {users.map((userInList) => {
          return <UserCardInList key={userInList.username} userInList={userInList} />;
        })}
      </section>
    </div>
  );
}
