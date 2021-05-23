import NextNprogress from "nextjs-progressbar";
import React from "react";

export const CustomNprogress: React.FC = () => {
  return (
    <NextNprogress
      color="#5C6BC0"
      startPosition={0.3}
      stopDelayMs={200}
      height={2}
      options={{ showSpinner: false }}
    />
  );
};
