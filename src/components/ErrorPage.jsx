import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";
import Home from "./Home";

export default function ErrorPage(err) {
  const { error } = useContext(ErrorContext);

  if (error === 404) {
    return <h2>Content Not Found...</h2>;
  } else if (error && error !== 404) {
    return <h2>Oh No... Something went wrong!</h2>;
  } else {
    return <Home />;
  }
}
