/*
1. Figure out the System
2. Get main system specs + ws ver
3. Chekc if logging in
4.
*/
const fs = require("fs");
const log = fs.readFileSync("./userLogs/log-saxanger.txt", "UTF8");
//const log = fs.readFileSync("./log.txt", "UTF8");
var logSplit = log.split("\n");


//STATE variables
var openVPNconnecting = false;
var openVPNconnected = false;
var UIconnected = false;
var UIbutton = '';




var currentLine = "";
//For loop goes trough all lines in log
for(var i=0;i<logSplit.length;i++){
	// /console.log("Line - " + i);
	//console.log(logSplit[i]);
	if(logSplit[i] != "") {

		if(~logSplit[i].indexOf("----------------") != 0){
			console.log("\n-------RESTART-------\n")
			continue;
		}

		currentLine = parseLine(logSplit[i]);

		//Check if user clicked connect or disconnect
		if(currentLine[2] == "user " && (~currentLine[3].toLowerCase().indexOf('connect') != 0)){		
			console.log(i + "\t" + "USER "+currentLine[3].split(" ")[0]);
		}



		//This checks if the currentLine is one where the button state is getting updated
		//UIbutton gets updated, UIconnected updated if button turns ON or OFF
		if(currentLine[2] == "basic" && (~currentLine[3].indexOf('CONNECT_BUTTON') != 0)){
			//update UIbutton state
			UIbutton = currentLine[3].split("_")[currentLine[3].split("_").length-1];
			UIbutton = UIbutton.slice(0,UIbutton.length-1);
			console.log(i + "\t" + UIbutton);
		
			//Update UIconnected state when the UIbutton turns ON or OFF 
			if(UIbutton == "OFF"){
				UIconnected = false;
			
			}else if(UIbutton == "ON"){
				UIconnected = true;
				/*if(UIbutton == "ON" && UIconnected && openVPNconnected){
					console.log(i + "\t" + "Connected SUCCESS");
				}*/
			}
		}

		//Check OpenVPN connection status, Update openVPNconnecting and openVPNconnected states 
		//depending on if the corresponding statuses are found in debug log
		if(UIbutton == "CONNECTING" && currentLine[2] == "openvpn"){
			if(~currentLine[3].indexOf(',CONNECTING,') != 0){
				openVPNconnecting = true;
				openVPNconnected = false;
				console.log(i + "\t" + "OpenVPN CONNECTING");

			}else if(~currentLine[3].indexOf(',CONNECTED,SUCCESS,') != 0){
				openVPNconnecting = false;
				openVPNconnected = true;
				console.log(i + "\t" + "OpenVPN CONNECTED");
			}
			

		}

		
		
	}
}



//parseLine splits passed in line into its 4 main components
//Returns array of [timestamp, seconds elapsed since start, current running process, message in log]
function parseLine(line){

	//[1106 16:55      1.456] [basic]\t update session status
	var tempLine = line.split("\t");
	//tempLine = [ '[1106 16:55      1.456] [basic]' , ' update session status' ]
	
	var msg = tempLine[1];
	msg = msg.slice(1,msg.length);
	//msg = 'update session status'

	tempLine = tempLine[0];
	tempLine = tempLine.split("] [");
	//templine = [ '[1106 16:55      1.456' , 'basic]' ]

	var dateTime = tempLine[0];
	dateTime = dateTime.slice(1,dateTime.length);
	//dateTime = '1106 16:55      1.456'

	dateTime = dateTime.split("      ")
	//dateTime = [ '1106 16:55' , '1.456' ]
	
	var elapsed = dateTime[1];
	dateTime = dateTime[0];
	//elapsed = '1.456'
	//dateTime = '1106 16:55'

	var runningService = tempLine[1]
	runningService = runningService.slice(0,runningService.length-1);
	//runningService = 'basic'


	/*console.log(dateTime);
	console.log(elapsed);
	console.log(runningService);
	console.log(msg);
	console.log("");*/
	
	return [dateTime, elapsed, runningService, msg];

}

