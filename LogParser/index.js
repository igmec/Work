const fs = require("fs");

const log = fs.readFileSync("./log.txt", "UTF8");

var logSplit = log.split("\n");

console.log(logSplit);


var apiConnect = false;
var wsAdapter = false;


for(var i=0;i<logSplit.length();i++){

	if(!apiConnect)

}