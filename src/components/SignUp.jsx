import "../styles/SignUp.css";
import { useState, useContext } from "react";
import { postUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";
import { urlRegex } from "../utils/utils";

export default function SignUp() {
  const { setUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    avatar_url: "",
    name: "",
  });
  const [visibility, setVisibility] = useState("hidden");

  const handleSubmit = (e) => {
    e.preventDefault();
    postUser(newUser)
      .then(() => {
        setUser(newUser);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("*");
        }
      });
    navigate("/reviews");
  };

  return (
    <div className="sign-up-form-container">
      <section className="sign-up-form">
        <h1>Create a User</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(event) => {
                setNewUser((current) => {
                  return {
                    ...current,
                    username: event.target.value,
                  };
                });
              }}
            />
          </label>
          <br />
          <label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(event) => {
                setNewUser((current) => {
                  return {
                    ...current,
                    name: event.target.value,
                  };
                });
              }}
            />
          </label>
          <br />
          <label>
            <input
              type="text"
              placeholder="Avatar URL"
              name="avat_url"
              onChange={(event) => {
                setNewUser((current) => {
                  return {
                    ...current,
                    avatar_url: event.target.value,
                  };
                });
              }}
              onBlur={(event) => {
                if (urlRegex.test(event.target.value)) {
                  setVisibility("hidden");
                } else {
                  setVisibility("visible");
                }
              }}
              required
            />
            <p className={visibility}>Please add a valid URL!</p>
          </label>
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}
