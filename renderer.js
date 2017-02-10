// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const steamSocket = require('./steamSocket');
var $ = require('jquery');
var game = require('electron').remote.getGlobal('steamSocket');
var ipcRenderer = require('electron').ipcRenderer;
var tIndex = 0;
var ctIndex = 0;
var players = {};
steamSocket.on("gameData", function (data) {
	console.log(data);
	if (typeof(data.map) !== 'undefined' && typeof(data.allplayers) !== 'undefined'){
		console.log("build");
	  	var scoreboard = $("#scoreboard");
	  	scoreboard.html("");
  		scoreboard.append('<tr><td>'+data.map.team_ct.score+'</td><td>Health</td><td>armor</td><td>money</td><td>kills</td><td>assists</td><td>deaths</td><td>score</td></tr>');
  		for (var i = 0; i < 5; i++) {
  			scoreboard.append("<tr id='ct_"+i+"'></tr>");
  		}
  		scoreboard.append('<tr><td>'+data.map.team_t.score+'</td><td>Health</td><td>armor</td><td>money</td><td>kills</td><td>assists</td><td>deaths</td><td>score</td></tr>');
  		for (var i = 0; i < 5; i++) {
  			scoreboard.append("<tr id='t_"+i+"'></tr>");
  		}
  		tIndex = 0;
		ctIndex = 0;
  		updatePlayers(data.allplayers);
  	}
});
steamSocket.on("gameError", function (data) {
	console.log("gameError");
	console.log(data);
});
/**
 * [updatePlayers description]
 * @param  {[type]} allplayers [description]
 * @return {[type]}            [description]
 */
function updatePlayers(allplayers) {
	players = merge_options(players, allplayers);
	for (var key in players) {
	    // skip loop if the property is from prototype
	    //if (!data.allplayers.hasOwnProperty(key)) continue;

	    var obj = players[key];
	    var htmlObj; 
	    if (obj.team == "T") {
	    	htmlObj = $("#t_"+tIndex);
	    	tIndex++;
	    }else{
	    	htmlObj = $("#ct_"+ctIndex);
	    	ctIndex++;
	    }
	    htmlObj.append("<td>"+ obj.name + " - "+ getRoundKills(obj.state.round_kills)+"</td><td>"+ obj.state.health+ "hp</td><td>"+obj.state.armor + "armor</td><td>" + obj.state.money + "$</td><td>" + obj.match_stats.kills + "</td><td>" + obj.match_stats.assists + "</td><td>" + obj.match_stats.deaths + "</td><td>" + obj.match_stats.score + "</td>");
	}
}
function getRoundKills(round_kills) {
	var string = "";
	for (var i = 0; i < round_kills; i++) {
		string += "*";
	}
	return string;
}
/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}