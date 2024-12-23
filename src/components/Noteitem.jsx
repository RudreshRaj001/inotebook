import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div>
      <div className="max-w-lg p-4 shadow-md dark:bg-[#110827] dark:text-white m-2">
        <div className="flex justify-between pb-4">
          <div className="flex items-center">
            <a
              rel="noopener noreferrer"
              href="#"
              className="mb-0 capitalize dark:text-gray-200"
            >
              {note.tag}
            </a>
          </div>
          <a rel="noopener noreferrer" href="#">
            See All
          </a>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            {/* <img
              src="https://i.pinimg.com/736x/ab/36/40/ab36409c1701081ee1838556eee67e79.jpg"
              alt=""
              className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
            /> */}
            <div className="flex items-center text-xs">
              <span>{note.date}</span>
            </div>
          </div>
          <div className="space-y-2">
            <a rel="noopener noreferrer" href="#" className="block">
              <h3 className="text-xl font-semibold dark:text-violet-600">
                {note.title}
              </h3>
            </a>
            <p className="leading-snug dark:text-gray-100">
              {note.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. At consequatur possimus est
            </p>
          </div>
        </div>
        <button
          type="button"
          className="px-8 py-2 font-semibold rounded dark:bg-red-900 dark:text-gray-100 mt-3 cursor-pointer mr-3"
          onClick={()=>{deleteNote(note._id)}}
        >
          Delete
        </button>
        <button
          type="button"
          className="px-8 py-2 font-semibold rounded dark:bg-green-900 dark:text-gray-100 mt-3  cursor-pointer"
          onClick={()=>{updateNote(note)}}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Noteitem;
