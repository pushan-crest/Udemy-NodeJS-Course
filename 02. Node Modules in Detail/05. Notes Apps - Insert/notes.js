const fs = require("fs");

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("New note added!");
  } else {
    console.log("Note title taken!");
  }
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const deleteNotes = function (title) {
  const notes = loadNotes();
  // excluding all notes except the title notes
  const remainingNotes = notes.filter(function (note) {
    return note.title !== title;
  });

  const DeleteNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (DeleteNotes.length === 0) {
    console.log("No Notes Match");
  } else {
    saveNotes(remainingNotes);
    console.log("Notes Deleted with title: " + title);
  }
};

const listNotes = function () {
  const notes = loadNotes();
  console.log(notes);
};

const reading = function (title) {
  const notes = loadNotes();
  const Readingnotes = notes.filter(function (note) {
    return note.title === title;
  });
  console.log(Readingnotes);
};

module.exports = {
  addNote: addNote,
  deleteNotes: deleteNotes,
  listNotes: listNotes,
  reading: reading,
};
