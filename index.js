const WEB_SOCKET_SERVER_PORT = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

//Spinning the HTTP server
const server = http.createServer();
server.listen(WEB_SOCKET_SERVER_PORT);
console.log('listening on port 8000');


// that WebSocket server will listen on the port 8000
const wsServer = new webSocketServer({
    httpServer: server
});


//this object wherein will store all the connected clients
const clients = {};

// in the request method we define what should happen once the server receives a request
// the request parameter is an object that contains information about the request

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', (request) => {

    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

    // You can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin);

    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.log('Received Message: ', message.utf8Data);

            // broadcasting message to all connected clients
            for (key in clients) {
                clients[key].sendUTF(message.utf8Data);
                console.log('sent Message to: ', clients[key]);
            }
        }
    });
});