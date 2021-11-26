import { useState } from "react";
import { postUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function SignUp({ setUser }) {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    avatar_url: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    postUser(newUser).then(() => {
      setUser(newUser);
    });
    navigate("/reviews");
  };

  return (
    <div className="signup-form-container">
      <h1>Create a User</h1>
      <form id="sign-up-form" onSubmit={handleSubmit}>
        <div className="sign-up-form">
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
            />
          </label>
          <br />
          <br />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
