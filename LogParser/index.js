/*
1. Figure out the System
2. Get main system specs + ws ver
3. Chekc if logging in
4.
*/
const fs = require("fs");
const log = fs.readFileSync("./log.txt", "UTF8");
var logSplit = log.split("\n");



for(var i=0;i<logSplit.length;i++){

	console.log(logSplit[i]);
	if(logSplit[i] != ""){
		parseLine(logSplit[i]);
	}
}






//console.log(logSplit);

/*
var apiConnect = false;
var wsAdapter = false;


for(var i=0;i<logSplit.length();i++){

	if(!apiConnect)

}
*/

function parseLine(line/*, OS*/){

	var tempLine = line.split("\t");
	var msg = tempLine[1];
	msg = msg.slice(1,msg.length);

	tempLine = tempLine[0];
	tempLine = tempLine.split("] [");

	var dateTime = tempLine[0];
	dateTime = dateTime.slice(1,dateTime.length);
	dateTime = dateTime.split("      ")
	var elapsed = dateTime[1];
	dateTime = dateTime[0];

	console.log(tempLine)
	var runningService = tempLine[1]
	runningService = runningService.slice(0,runningService.length-1);	
	
	var msg = line.split("\t")[1];
	msg = msg.slice(1,msg.length);
	
	//if(runningService != "basic"){
		
		//console.log(dateTime);
		//console.log(elapsed);
		//console.log(runningService);
		//console.log(msg);
	//}

//	tempLine = line.split("\t")[0];


}

function getMsg(){


}