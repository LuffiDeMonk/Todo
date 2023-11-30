import { Spinner } from "@material-tailwind/react";
import React from "react";

const Loading = () => {
  return (
    <div className="absolute z-30 inset-0 h-screen bg-opacity-40 bg-black backdrop-blur-md flex items-center justify-center">
      <Spinner color="orange" />
    </div>
  );
};

export default Loading;
