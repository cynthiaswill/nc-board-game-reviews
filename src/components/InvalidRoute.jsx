import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [redirect, setRedirect] = useState(false);
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    let isSubscribed = true;
    const counter = setInterval(() => {
      isSubscribed &&
        setCounter((current) => {
          return current - 1;
        });
    }, 1000);

    const timer = setTimeout(() => {
      isSubscribed && setRedirect(true);
    }, 3000);

    return () => {
      clearInterval(counter);
      clearTimeout(timer);
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      {redirect ? (
        <Navigate to="/reviews" />
      ) : (
        <div className="welcome">
          <h2>Invalid URL ...</h2>
          <p style={{ fontWeight: "bold" }}>
            redirecting to reviews after {counter} seconds ...
          </p>
        </div>
      )}
    </>
  );
}
