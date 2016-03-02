//Lets require/import the HTTP module
var http = require('http');
var url = require('url');
var uuid = require('node-uuid');
var Threads= require('webworker-threads');


const PORT=8088; 

cost n = 5;


var nodes = [];
var rumors = [];

function handleRequest(request, response){
    var q = url.parse(request.url, true).query;
    if (q == "create") {
        var id = createNode();
        response.redirect(request.url + '/' + id);
        response.end();
    }
    else 
    {
        id = url.parse(request.url, true).query.pathname;
        if (q == "rumor") {
            var name = request.body.name;
            var text = request.body.text;
            var rumor = {"Rumor" : {"MessageID": id, "Originator": name, "Text": text}, "EndPoint": request.url}};
            addRumor(id, rumor);
        }
        else {
            handle(id, body);
        }
        response.sendfile('UI.html');
        response.end();
    }
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

function createNode(originID) {
    var UUID = uuid.v1();
    var peers = createRandomPeers();
    nodes.push({"id": UUID, "peers": peers});
    var node = Threads.create();
    node.q = [];
    node.msgs = [];
    node.wants = [];
    node.propagate();
    node.handle();
    return UUID;
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

function propagate(originURL) {
    while (true) {
        for (var peer in peers) {
            var msg = msgs.pop();
            if (msg.EndPoint == originURL)
                msg.Rumor.MessageID += ":" + counter.toString();
            var url = q.pop();
            var post_data = querystring.stringify(msg);
            var post_options = {
                host: originURL,
                port: 8085,
                method: 'POST'};

            var post_req = http.request(post_options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log('Response: ' + chunk);
                });
            });

            post_req.write(post_data);
            post_req.end();
            sleep(n);
            
        }             
    }
}


function handle(id, msg) {
    if (  msg.Rumor ) {
        msgs.push(msg);
    } else if ( msg.Want ) {
        wants.push(msg);
        for (var want in wants) {
            var s = prepareMsg(state, w);
        }
        var url = msg.Endpoint;
        q.add(url);
        }
    }
}