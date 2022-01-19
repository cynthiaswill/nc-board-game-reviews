import "../styles/SignUp.css";
import { useState, useContext, useEffect } from "react";
import { getUsers, postUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ErrorContext } from "../contexts/ErrorContext";
import { ParticleContext } from "../contexts/ParticleContext";
import { urlRegex, particleOptions } from "../utils/utils";
import TextField from "@material-ui/core/TextField";

export default function SignUp() {
  const { setUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const { setParticleOps } = useContext(ParticleContext);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    avatar_url: "",
    name: "",
  });
  const [visibility, setVisibility] = useState("hidden");
  const [showNameValidation, setShowNameValidation] = useState(false);
  const [showUsernameValidation, setShowUsernameValidation] = useState(false);
  const [userList, setUserList] = useState([]);
  const [showUsernameError, setShowUsernameError] = useState(false);

  useEffect(() => {
    setParticleOps(particleOptions);
    getUsers().then(({ data }) => {
      setUserList(data.users.map((user) => user.username));
    });
  }, [setParticleOps]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postUser(newUser)
      .then(() => {
        setUser(newUser);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
    navigate("/reviews");
  };

  return (
    <div className="sign-up-form-container">
      <section className="sign-up-form">
        <h1>Create new account</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            size="small"
            label="Username:"
            style={{ width: 150 }}
            inputProps={{ style: { fontSize: 12 } }}
            InputLabelProps={{ style: { fontSize: 12 } }}
            onChange={(event) => {
              if (userList.includes(event.target.value)) {
                setShowUsernameError(true);
              } else {
                setNewUser((current) => {
                  return {
                    ...current,
                    username: event.target.value,
                  };
                });
                setShowUsernameError(false);
              }
            }}
            onBlur={(event) => {
              if (/[^\w]/.test(event.target.value)) {
                setShowUsernameValidation(true);
              } else {
                setShowUsernameValidation(false);
              }
            }}
            required
            maxLength="25"
          />
          {showUsernameValidation ? (
            <p className="validation-warning">
              Username can only contain alphanumeric and underscore.
            </p>
          ) : (
            <br />
          )}
          {showUsernameError ? (
            <p className="validation-warning">This username already exists.</p>
          ) : null}
          <TextField
            size="small"
            style={{ width: 150 }}
            inputProps={{ style: { fontSize: 12, marginTop: 5 } }}
            InputLabelProps={{ style: { fontSize: 12, marginTop: 5 } }}
            onChange={(event) => {
              setNewUser((current) => {
                return {
                  ...current,
                  name: event.target.value,
                };
              });
            }}
            label="Name:"
            onBlur={(event) => {
              if (/[^a-zA-Z.\s]/.test(event.target.value)) {
                setShowNameValidation(true);
              } else {
                setShowNameValidation(false);
              }
            }}
            required
            maxLength="25"
          />
          {showNameValidation ? (
            <p className="validation-warning">
              Name must only contain letters, white space or period sign.
            </p>
          ) : (
            <br />
          )}

          <TextField
            size="small"
            style={{ width: 150 }}
            label="Avatar URL:"
            inputProps={{ style: { fontSize: 12, marginTop: 5 } }}
            InputLabelProps={{ style: { fontSize: 12, marginTop: 5 } }}
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

          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}
