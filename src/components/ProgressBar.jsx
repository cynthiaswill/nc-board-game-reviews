import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ProgressBar() {
  const path = useLocation().pathname;
  const [progress, updateProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => {
        updateProgress((prev) => {
          const updatedProgress = prev + 10;

          if (updatedProgress === 100) {
            clearInterval(interval);
          }
          return updatedProgress;
        });
      },
      path === "/" ? 200 : 25
    );
  }, [path]);

  return (
    <>
      <span style={{ textShadow: "0 0 3px white, 0 0 5px white" }}>{progress}%</span>{" "}
      <progress id="progress" value={progress} max={100} />
    </>
  );
}
