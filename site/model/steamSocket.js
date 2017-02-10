var http = require('http');
window.$ = window.jQuery = require('jquery');
var tIndex = 0;
var ctIndex = 0;
var players = {};

var server = http.createServer( function(req, res) {
 
    if (req.method == 'POST') {
        console.log("Handling POST request...");
        res.writeHead(200, {'Content-Type': 'text/html'});
 
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {

            //console.log("POST payload: " + body);
            updateHtml(JSON.parse(body));
        	
        	res.end( '' );
        });
    }
    else
    {
        console.log("Not expecting other request types...");
    	ee.emit("gameError", "Not expecting other request types...");
    }
 
});
server.listen(1337);
console.log('Listening at 1337');

function updateHtml(data) {
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
}
function updatePlayers(allplayers) {
	players = allplayers; //merge_options(players, allplayers);
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