import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const {addNote, setYes} = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""});
  const handleClick = async (e) => {
    e.preventDefault();
    let okay = await addNote(note.title, note.description, note.tag);
    // console.log(okay);
    if(okay){
      setYes(true);
      setTimeout(() => {
        setYes(false);
      }, 2000);
      setNote({title: "", description: "", tag: ""});
    }
  };
  const onchange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  };
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold leading-tight text-white">Add A Note</h1>
      <form
        noValidate=""
        action=""
        className="container flex flex-col mx-auto space-y-12 my-3"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-600 text-slate-50">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Add Note</p>
            <p className="text-xs">Adipisci fuga autem eum!</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="title" className="text-sm">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Add Title"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-black focus:dark:ring-violet-600 dark:border-gray-300 p-2"
                onChange={onchange}
                minLength={3}
                required
                value={note.title}
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="tag" className="text-sm">
                Tag
              </label>
              <input
                id="tag"
                name="tag"
                type="text"
                placeholder="Add Description"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-black focus:dark:ring-violet-600 dark:border-gray-300 p-2"
                onChange={onchange}
                minLength={5}
                required
                value={note.tag}
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="description" className="text-sm">
                Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Add Description"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-black focus:dark:ring-violet-600 dark:border-gray-300 p-2"
                onChange={onchange}
                minLength={5}
                required
                value={note.description}
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="Note" className="text-sm">
                Note
              </label>
              <textarea
                id="Note"
                placeholder=""
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-black focus:dark:ring-violet-600 dark:border-gray-300 h-[200px] p-2"
                onChange={onchange}
              ></textarea>
            </div>
            {/* <div className="w-full space-y-1">
              <label htmlFor="files" className="block text-sm font-medium">
                Attachments
              </label>
              <div className="flex">
                <input
                  type="file"
                  name="files"
                  id="files"
                  className="px-8 py-12 border-2 border-dashed rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100"
                />
              </div>
            </div> */}
            <div className="col-span-full">
              <p className="text-sm">
                Photo
              </p>
              <div className="flex items-center space-x-2">
                <img
                  src="https://i.pinimg.com/736x/c9/5e/a8/c95ea88cd9e3cfa2d2702cde4fdc6355.jpg"
                  alt=""
                  className="w-10 h-10 dark:bg-gray-500 rounded-full dark:bg-gray-300"
                />
                <button
                  disabled={note.title.length < 5 || note.description.length < 5}
                  type="button"
                  className={`px-4 py-2 rounded-md ${note.title.length < 5 || note.description.length < 5 ? 'dark:bg-red-600': 'dark:bg-violet-600'}  dark:text-gray-50 font-semibold`}
                  onClick={handleClick}
                >
                  {note.title.length < 5 || note.description.length < 5 ? 'disabled': 'ADD NOTE'}
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AddNote;
