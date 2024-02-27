// Terminal string styling done right
const chalk = require("chalk");

// inversing the values
const greenMsg = chalk.green.inverse.bold("Success!");
console.log(greenMsg);

// coloring fonts
console.log(chalk.green.bold("Hello World"));
console.log(chalk.green.underline("Hello World"));
