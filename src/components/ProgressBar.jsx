import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, updateProgress] = useState(0);

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
      <progress id="progress" value={progress} max={100} /> <span>{progress}%</span>
    </>
  );
}
