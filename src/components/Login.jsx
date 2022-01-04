import "../styles/Login.css";
import { useEffect, useState, useContext } from "react";
import { getUsers } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";
import UserCardInList from "./UserCardInList";

export default function Login() {
  const { setError } = useContext(ErrorContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then(({ data }) => {
        setUsers(data.users);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
  }, [setError, navigate]);

  if (isLoading === true) {
    return <h2>Loading...</h2>;
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
