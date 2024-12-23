import React, { useState, useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const Alert = (props) => {
  const context = useContext(noteContext);
  const {yes, setYes, message, status} = context;
  // setTimeout(() => {
  //   setYes(false);
  // }, 1000);
  const handleonclick = () => {
    setYes(false);
  };

  return (
    <div>
      <div className={`flex shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl dark:bg-gray-50 dark:text-gray-800 dark:divide-gray-300 fixed z-10 mt-4 left-1/2 transform -translate-x-1/2 ${yes ? '':'hidden'}`}>
        <div className={`flex flex-1 flex-col p-4 border-l-8 ${status == 'success' ? 'dark:border-green-600': 'dark:border-red-600'}`}>
          <span className="text-2xl">{status}</span>
          <span className="text-xs dark:text-gray-600">
            {message}
          </span>
        </div>
        <button className="px-4 flex items-center text-xs uppercase tracking-wide dark:text-gray-600 dark:border-gray-300" onClick={handleonclick}>
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default Alert;
