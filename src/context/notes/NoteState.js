import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  // const id = '6760f5ba896833d994c3464a';
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  const [yes, setYes] = useState(false);
  const [message, setMessage] = useState("new note added in the database.");
  const [status, setStatus] = useState("success");
  const [user, setUser] = useState('no user');

  const alertPop = (aleartmessage, alertstatus) =>{
    setMessage(aleartmessage);
    setStatus(alertstatus);
    setYes(true);
    setTimeout(() => {
      setYes(false);
    }, 2000);
  }

  const getUserData = async () => {
    if(localStorage.getItem('authToken')){
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('authToken'),
        },
      });
      const json = await response.json();
      console.log(json);
      setUser(json.name);
    }
  }
  getUserData();

  // create a note
  const addNote = async (title, description, tag) => {
    // const {title, description, tag} = newnote;

    // TODO: API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    // console.log(response);

    console.log("adding a new note");
    // console.log(!json.errors);
    // let note = {
    //   "_id": "6762fc188f576",
    //   "user": "675d54c217f6e38158de371b",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2024-12-18T16:43:05.678Z",
    //   "__v": 0
    // };
    // setNotes(notes.concat(note));
    getNotes();
    return !json.errors;
  };
  // read the notes
  const getNotes = async () => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken'),
      },
    });
    const json = await response.json();
    setNotes(json);
    console.log(json);
  };
  // update a note
  const editNote = async (id, title, description, tag) => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    // Logic to edit in client
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    getNotes();
    alertPop("Note updated in the database", "success");
  };
  // delete a note
  const deleteNote = async (id) => {
    // TODO: API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken'),
      },
      body: JSON.stringify({}),
    });
    const json = await response.json();
    console.log(json);

    console.log("deleting the note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    alertPop("Note deleted from the database", "success");
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        editNote,
        deleteNote,
        getNotes,
        alertPop,
        user, 
        yes,
        setYes,
        message,
        status,
        getUserData,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
