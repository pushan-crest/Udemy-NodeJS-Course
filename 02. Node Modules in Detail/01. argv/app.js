const chalk = require("chalk");
const command = process.argv[2];

// process.argv is used to get all the arguements passed by the user
console.log(process.argv);

if (command === "add") {
  console.log("Adding note!");
} else if (command === "remove") {
  console.log("Removing note!");
}
