
module.exports = {

    dataBase: null, // 資料庫

    /**
     * 初始化
     * @param {Object} dataBase , dataBase物件
     */
    init(dataBase) {
        this.dataBase = dataBase;

        console.log(`platform::dataBase ${this.dataBase}`);
    },

    // 分配訊息
    dispatchMsg(connect, message) {
        console.log('platform::dispatchMsg');
        const jsonMsg = JSON.parse(message);
        console.log(`platform::jsonMsg ${jsonMsg}`);
        switch (jsonMsg.action) {
            case 'Login':
                this.login(jsonMsg.account, (data) => {
                    connect.sendUTF(String(data));
                });
                break;
            case 'Logout':

                this.logout();
                // this.connection.sendUTF(String(this.getWheelInfo()));

                break;

            case 'SavePoint':
                this.savePoint(jsonMsg.account, jsonMsg.point);
                connect.sendUTF(String('null'));

                break;

            default:
                break;
        }
    },

    // 登入
    login(name, callBackFun) {
        console.log(`${name} Login`);

        this.checkPlayerInfo(name, (data) => {
            callBackFun(data);
        });
    },

    // 登出
    logout() {
        console.log('Logout');
    },

    // 檢查資料
    checkPlayerInfo(name, callBackFun) {
        console.log(`platform::checkPlayerInfo ${this.dataBase}`);

        this.dataBase.getData(name, (data) => {
            let playerInfo = JSON.stringify({
                type: 'PlayerInfo',
                result: 'true',
                account: name,
                point: 10000,
            });

            if (data != null) {
                console.log(`Get Redis Info: ${data}`);

                const JsonMsg = JSON.parse(data);

                JsonMsg.result = 'true';
                playerInfo = JSON.stringify(JsonMsg);
            }
            else {
                this.dataBase.setData(name, String(playerInfo));
            }

            callBackFun(playerInfo);
        });
    },

    // 儲存點數
    savePoint(name, point) {
        const playerInfo = JSON.stringify({
            type: 'PlayerInfo',
            account: name,
            point,
        });

        this.dataBase.setData(name, String(playerInfo));
    },

};
