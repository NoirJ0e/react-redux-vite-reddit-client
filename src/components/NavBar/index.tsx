import React from "react";
import redditIcon from "./assets/reddit-icon.png";

function NavBar() {
  return (
    <div className="bg-gray-300 min-h-5 flex flex-row items-center justify-center shadow-md">
      <img src={redditIcon} alt="blue reddit icon" className="w-6 h-6" />
      <h1 className="text-center text-white text-xl">
        <strong className="text-blue-500">React</strong>
        Reddit
      </h1>
    </div>
  );
}

export default NavBar;
