import React from "react";

export default function ProgressBar({ value, max }) {
  return (
    <>
      <progress id="progress" value={value} max={max} />{" "}
      <span>{(value / max) * 100}%</span>
    </>
  );
}
