import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, setYes, alertPop } = context;
  let navigate = useNavigate();

  // --------------
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "Breaking Bad"})
    const handleClick = (e) => {
      console.log('updating the node', note)
      e.preventDefault();
      ref.current.click();
      editNote(note.id, note.etitle, note.edescription, note.etag);
      // setYes(true);
      // setTimeout(() => {
      //   setYes(false);
      // }, 2000);
    };
    const onchange = (e) => {
      setNote({...note, [e.target.name]: e.target.value});
    };
  // --------------

  useEffect(() => {
    if(localStorage.getItem('authToken')){
      getNotes();
      console.log(localStorage.getItem('authToken'));
    }else{
      alertPop("No User Logged In", "Failure");
      navigate("/login");
    }
  }, []);
  // getNotes();

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  return (
    <>
      <AddNote />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form
        noValidate=""
        action=""
        className="container flex flex-col mx-auto space-y-12 my-3"
      >
        <fieldset className="p-4 rounded-md shadow-sm dark:bg-gray-600 text-slate-50">
          {/* <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Add Note</p>
            <p className="text-xs">Adipisci fuga autem eum!</p>
          </div> */}
          <div className="grid grid-cols-6 gap-2 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">

              <label htmlFor="etitle" className="text-sm">
                Title
              </label>
              <input
                id="etitle"
                name="etitle"
                type="text"
                placeholder="Add Title"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-black focus:dark:ring-violet-600 dark:border-gray-300 p-2" 
                minLength={3}
                required
                value={note.etitle}
                onChange={onchange}
              />

            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="etag" className="text-sm">
                Tag
              </label>
              <input
                id="etag"
                name="etag"
                type="text"
                placeholder="Add Description"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-black focus:dark:ring-violet-600 dark:border-gray-300 p-2"
                minLength={5}
                required
                value={note.etag}
                onChange={onchange}

              />
            </div>
            <div className="col-span-full">
              <label htmlFor="edescription" className="text-sm">
                Description
              </label>
              <input
                id="edescription"
                name="edescription"
                type="text"
                placeholder="Add Description"
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-black focus:dark:ring-violet-600 dark:border-gray-300 p-2"
                minLength={5}
                required
                value={note.edescription}
                onChange={onchange}
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="Note" className="text-sm">
                Note
              </label>
              <textarea
                id="Note"
                placeholder=""
                className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-black focus:dark:ring-violet-600 dark:border-gray-300 h-[100px] p-2"
                onChange={onchange}
              ></textarea>
            </div>
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
                {/* <button
                  type="button"
                  className="px-4 py-2 rounded-md dark:bg-violet-600 dark:text-gray-50 font-semibold"
                  onClick={handleClick}
                >
                  Add Note
                </button> */}
              </div>
            </div>
          </div>
        </fieldset>
      </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="px-6 py-2 rounded-sm shadow-sm dark:bg-gray-600 dark:text-gray-50"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className={`px-4 py-2 rounded-md ${note.etitle.length < 5 || note.edescription.length < 5 ? 'dark:bg-red-600': 'dark:bg-violet-600'}  dark:text-gray-50 font-semibold`}
              onClick={handleClick}
              ref={refClose}
              >
                {note.etitle.length < 5 || note.edescription.length < 5 ? 'disabled': 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-4 text-2xl font-semibold leading-tight text-white">Your Notes</h2>
      <div className="container text-white">
        {notes.length === 0 && 'No Notes Available'}
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {notes.map((note) => (
          <Noteitem key={note._id} updateNote={updateNote} note={note} />
        ))}
      </div>
    </>
  );
};

export default Notes;
