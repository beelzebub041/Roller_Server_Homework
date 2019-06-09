
const WebSocketServer = require('websocket').server;
const http = require('http');

module.exports = {

    server: null,
    wsServer: null,

    /**
     * 建立 WebSocketServer
     * @param {*} callbackFun
     */
    init(callbackFun) {
        this.server = http.createServer((request, response) => {
            console.log(`${new Date()} Received request for ${request.url}`);
            response.write('Server Start');
            response.end();
        });

        this.server.listen(8080, () => {
            console.log(`${new Date()} Server is listening on port 8080`);
        });

        const wsServer = new WebSocketServer({
            httpServer: this.server,
            // You should not use autoAcceptConnections for production
            // applications, as it defeats all standard cross-origin protection
            // facilities built into the protocol and the browser.  You should
            // *always* verify the connection's origin and decide whether or not
            // to accept it.
            autoAcceptConnections: false,
        });

        callbackFun(wsServer);
    },

};


// function socket(database) {
//     console.log(`database: ${database}`);
//     const db = database;

//     console.log(`db: ${db}`);

//     const server = http.createServer((request, response) => {
//         console.log(`${new Date()} Received request for ${request.url}`);
//         response.write('Server Start');
//         response.end();
//     });

//     server.listen(8080, () => {
//         console.log(`${new Date()} Server is listening on port 8080`);
//     });

//     const wsServer = new WebSocketServer({
//         httpServer: server,
//         // You should not use autoAcceptConnections for production
//         // applications, as it defeats all standard cross-origin protection
//         // facilities built into the protocol and the browser.  You should
//         // *always* verify the connection's origin and decide whether or not
//         // to accept it.
//         autoAcceptConnections: false,
//     });

//     function originIsAllowed(origin) {
//     // put logic here to detect whether the specified origin is allowed.
//         return true;
//     }

//     wsServer.on('request', (request) => {
//         if (!originIsAllowed(request.origin)) {
//         // Make sure we only accept requests from an allowed origin
//             request.reject();
//             console.log(`${new Date()} Connection from origin ${request.origin} rejected.`);
//             return;
//         }

//         console.log('Wait Connect');

//         const connection = request.accept('echo-protocol', request.origin);
//         console.log(`${new Date()} Connection accepted.`);

//         // 初始化 require的物件
//         initObject();

//         connection.on('message', (message) => {
//             if (message.type === 'utf8') {
//                 dispatchMsg(message);
//             }
//             else if (message.type === 'binary') {
//                 console.log(`Received Binary Message of ${message.binaryData.length} bytes`);
//                 connection.sendBytes(message.binaryData);
//             }
//         });

//         connection.on('close', (reasonCode, description) => {
//             console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
//         });

//         // 初始化引用檔案
//         function initObject() {
//             prob.init(connection);
//             console.log(`init db: ${db}`);
//             platform.init(connection, db);
//         }

//         // 分派訊息
//         function dispatchMsg(message) {
//             console.log(`Received Message: ${message}`);

//             const jsonMsg = JSON.parse(message.utf8Data);
//             console.log(`Json.Type: ${jsonMsg.type} Json.Data: ${jsonMsg.data}`);

//             switch (jsonMsg.type) {
//                 case 'platform':
//                     platform.dispatchMsg(jsonMsg.data);
//                     break;
//                 case 'prob':
//                     prob.dispatchMsg(jsonMsg.data);
//                     break;
//                 default:
//                     break;
//             }
//         }
//     });
// }

// exports.start = start;
