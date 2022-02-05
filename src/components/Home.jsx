import { Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ParticleContext } from "../contexts/ParticleContext";
import { particleOptions } from "../utils/utils";
import ProgressBar from "./ProgressBar";

export default function Home() {
  const { setParticleOps } = useContext(ParticleContext);
  const [redirect, setRedirect] = useState(false);
  const [counter, setCounter] = useState(3);
  const [progress, updateProgress] = useState(0);

  useEffect(() => {
    setParticleOps(particleOptions);
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
  }, [setParticleOps]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateProgress((prev) => {
        const updatedProgress = prev + 10;

        if (updatedProgress === 100) {
          clearInterval(interval);
        }
        return updatedProgress;
      });
    }, 200);
  }, []);

  return (
    <>
      {redirect ? (
        <Navigate to="/reviews" />
      ) : (
        <div className="welcome">
          <h2>Welcome to NC Board Game Reviews</h2>
          <p style={{ fontWeight: "bold" }}>
            <i className="fa fa-cog fa-spin" /> redirecting to reviews after {counter}{" "}
            seconds ...
          </p>
          <ProgressBar value={progress} max={100} />
        </div>
      )}
    </>
  );
}
