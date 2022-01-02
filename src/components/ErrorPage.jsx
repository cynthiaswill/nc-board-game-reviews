import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";
import Home from "./Home";

export default function ErrorPage() {
  const { error } = useContext(ErrorContext);

  if (error) {
    if (error === 404) {
      return (
        <div className="error-page">
          <h2>Content Not Found ...</h2>
        </div>
      );
    } else if (error === 530) {
      return (
        <div className="error-page">
          <h2>You are not logged in... Please log in first!</h2>
        </div>
      );
    } else {
      return (
        <div className="error-page">
          <h2>Oh No... Something went wrong!</h2>
        </div>
      );
    }
  } else {
    return <Home />;
  }
}
