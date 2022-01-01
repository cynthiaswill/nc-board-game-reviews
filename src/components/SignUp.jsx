import "../styles/SignUp.css";
import { useState, useContext } from "react";
import { postUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";

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
                const regex =
                  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
                if (regex.test(event.target.value)) {
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
