const getNotes = require("./notes.js");
const add = require("./addition.js");

const msg = getNotes();
console.log(add(20, 30));
console.log(msg);
