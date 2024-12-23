const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator"); // import express-validator

// ROUTE 1: get all the notes using : get "/api/auth/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: add a new note using post : POST "/api/auth/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    // user title description
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: updating an existing note using put : PUT "/api/auth/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send(`Not Found`);
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send(`Not Allowed`);
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: delete an existing note using delete : DELETE "/api/auth/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send(`Not Found`);
    }

    // Allow Deleteion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send(`Not Allowed`);
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note deleted successfully", note: note });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
