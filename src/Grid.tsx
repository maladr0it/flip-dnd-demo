import React from "react";

import "./Grid.css";

interface Props {
  className?: string;
}

export const Grid: React.FC<Props> = ({ className = "", children }) => {
  return <div className={`Grid ${className}`}>{children}</div>;
};
