//Lets require/import the HTTP module
var http = require('http');
var url = require('url');
var uuid = require('node-uuid');

const PORT=8088; 

var nodes = [];
var rumors = [];

function handleRequest(request, response){
    var q = url.parse(request.url, true).query;
    if (q == "create") {
        var id = createNode();
        response.redirect(request.url + '/' + id);
        response.sendfile('UI.html');
        response.end();
    }
    else if (q == "rumor") {
        //id = 
    }
    else if (q = "") {
        //if request to specific node, forward to that thread
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

function createNode() {
    var UUID = uuid.v1();
    var peers = createRandomPeers();
    nodes.push({"id": UUID, "peers": peers});
    
    return UUID;
    //start a thread that propagates and a thread that responds
}

function createRandomPeers(UUID) {
    var peers = [];
    for (var i = 0; i < Math.random()%nodes.length; i++) {
        var ind = Math.random()%nodes.length;
        if (!peers.contains(nodes[ind].id)) {
            peers.push(nodes[ind].id);
            nodes[ind].peers.push(UUID);
        }
    }
    return peers;
}

function propagate() {
    while (true) {
        for (peer in peers) {
            
        }             
        //s = prepareMsg(state, q)       
        //<url> = lookup(q);
        //send (<url>, s) ;             
        //sleep n;
    }
}
//Each node will also provide an HTTP endpoint that responds to POST of valid messages in the following way:

function handle() {
    /*
t = getMessage();
if (  isRumor(t)  ) {
     store(t)
} elsif ( isWant(t) ) {
    work_queue = addWorkToQueue(t)
    foreach w work_queue {
      s = prepareMsg(state, w)
      <url> = getUrl(w)
      send(<url>, s)
      state = update(state, s)
    }
}
*/
}