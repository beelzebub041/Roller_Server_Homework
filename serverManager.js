
const socket = require('./socket');
const redis = require('./redis.js');
const platform = require('./platform');
const Game = require('./game');

const clientMgr = new Map();
const gameMgr = new Map();

let curClientIdx = 0;

// 建立Redis連線物件
redis.createRedis();

// 開始連線
redis.startConnect(() => {
    // 初始化socket物件
    socket.init((wsServer) => {
        listenClientConnect(wsServer);
    });

    // 初始化平台物件
    platform.init(redis);
});

/**
 * @param {*} origin
 */
function originIsAllowed(origin) {
// put logic here to detect whether the specified origin is allowed.
    return true;
}

/**
 * 監聽客端連線
 * @param {Object} wsServer
 */
function listenClientConnect(wsServer) {
    console.log(`WsServer: ${wsServer}`);

    wsServer.on('request', (request) => {
        if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
            request.reject();
            console.log(`${new Date()} Connection from origin ${request.origin} rejected.`);
            return;
        }

        const connection = request.accept('echo-protocol', request.origin);
        const clientIdx = curClientIdx;

        // 加入Client容器
        clientMgr.set(clientIdx, connection);
        curClientIdx++;

        console.log(`Client: ${clientIdx} Connection accepted.`);

        connection.on('message', (message) => {
            if (message.type === 'utf8') {
                dispatchClientMsg(clientIdx, message);
            }
            else if (message.type === 'binary') {
                console.log(`Received Binary Message of ${message.binaryData.length} bytes`);
                connection.sendBytes(message.binaryData);
            }
        });

        connection.on('close', (reasonCode, description) => {
            console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
        });
    });
}

/**
 * @param {Integer} clientIdx, 客端編號
 * @param {Json} message, 客端傳過來的訊息
 */
function dispatchClientMsg(clientIdx, message) {
    console.log(`Received Client:${clientIdx} Message: ${message}`);

    const jsonMsg = JSON.parse(message.utf8Data);

    switch (jsonMsg.type) {
        case 'platform':
            if (clientMgr.get(clientIdx) != null) {
                platform.dispatchMsg(clientMgr.get(clientIdx), jsonMsg.data);

                const gameInit = new Game();
                gameInit.createGame(clientIdx, clientMgr.get(clientIdx));
                gameMgr.set(clientIdx, gameInit);
            }

            break;
        case 'prob':
            if (gameMgr.get(clientIdx) != null) {
                const gameRun = gameMgr.get(clientIdx);
                gameRun.dispatchMsg(jsonMsg.data);
            }

            break;
        default:
            break;
    }
}
