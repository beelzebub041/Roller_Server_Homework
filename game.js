const prob = require('./prob');
const check = require('./wheelCheck.js');

module.exports = function Game() {
    this.userIndex = -1;
    this.connection = null;

    /**
     * 建立遊戲物件
     * @param {Interger} userIndex
     * @param {Object} connection
     */
    this.createGame = function createGame(userIndex, connection) {
        console.log(`create client: ${userIndex} Game`);

        this.userIndex = userIndex;
        this.connection = connection;

        prob.initProb(3, 5, 5);
        check.init();
    };

    this.dispatchMsg = function dispatchMsg(message) {
        console.log(`Game DispatchMsg message: ${message}`);

        const jsonMsg = JSON.parse(message);

        switch (jsonMsg.action) {
            case 'Init':

                this.connection.sendUTF(String(prob.getWheelInfo()));

                break;

            case 'Spin':

                {
                    const wheelInfo = prob.getWheelInfo();

                    const winInfo = check.isWin(wheelInfo);

                    const jsonSendMsg = JSON.stringify(

                        {
                            Wheel: wheelInfo,
                            win: winInfo,
                        },
                    );

                    this.connection.sendUTF(String(jsonSendMsg));
                }


                break;
            default:
                break;
        }
    };

    function initGame(msg) {

    }

    function onspin() {

    }


    function getWheelInfo() {

    }


    /**
     * 送出封包
     * @param {Json} data
     */
    function sendPacket(data) {
        console.log(`client: ${this.userIndex} send: ${data}`);
    }

    /**
     * 接收封包
     * @param {*} data
     */
    function receivePacket(data) {
        console.log(`client: ${this.userIndex} Receive: ${data}`);
    }
};
