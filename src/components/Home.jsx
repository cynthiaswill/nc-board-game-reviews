import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [redirect, setRedirect] = useState(false);
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    const counter = setInterval(() => {
      setCounter((current) => {
        return current - 1;
      });
    }, 1000);

    const timer = setTimeout(() => {
      setRedirect(true);
    }, 3000);

    return () => {
      clearInterval(counter);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {redirect ? (
        <Navigate to="/reviews" />
      ) : (
        <div className="welcome">
          <h2>Welcome to NC Board Game Reviews</h2>
          <p>redirecting to reviews after {counter} seconds ...</p>
        </div>
      )}
    </>
  );
}
