// The node module is used to interace with file system of the machine

const fs = require("fs");

// creates a file named Text.txt and add the second parameter as its content
fs.writeFileSync("Text.txt", "Hello World");

// Append to the file
fs.appendFileSync("Text.txt", "The best first Program");
