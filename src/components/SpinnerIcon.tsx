import React from "react";

const SpinnerIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{
      margin: "auto",
      background: "none",
      display: "block",
      shapeRendering: "auto",
      width: "50px",
      height: "50px",
    }}
    viewBox="0 0 100 100"
  >
    <g transform="rotate(0 50 50)">
      <circle
        cx="50"
        cy="50"
        r="25"
        fill="none"
        stroke="#1E0A8E"
        strokeWidth="2"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="0.8s"
          values="0;40"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="0s"
        ></animate>
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="0.8s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="0s"
        ></animate>
      </circle>
      <circle
        cx="50"
        cy="50"
        r="25"
        fill="none"
        stroke="#1E0A8E"
        strokeWidth="2"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="0.8s"
          values="0;40"
          keyTimes="0;1"
          keySplines="0 0.2 0.8 1"
          calcMode="spline"
          begin="-0.4s"
        ></animate>
        <animate
          attributeName="opacity"
          repeatCount="indefinite"
          dur="0.8s"
          values="1;0"
          keyTimes="0;1"
          keySplines="0.2 0 0.8 1"
          calcMode="spline"
          begin="-0.4s"
        ></animate>
      </circle>
    </g>
  </svg>
);

export default SpinnerIcon;
