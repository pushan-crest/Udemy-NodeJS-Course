const fs = require("fs");

const dataBuffer = fs.readFileSync("./data.json");

const dataJSON = dataBuffer.toString();
console.log(dataJSON);

const user = JSON.parse(dataJSON);
user.name = "Gunther";
user.age = 54;
console.log(user);

const userJSON = JSON.stringify(user);
console.log(userJSON);
fs.writeFileSync("data2.json", userJSON);
