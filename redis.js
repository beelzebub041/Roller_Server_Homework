const redis = require('redis');

module.exports = {

    client: null,

    /**
     * 建立Redis連線物件
     * @param {Object} ws 單一 websocket 連線物件
    */
    createRedis() {
        console.log('Create Redis');

        this.client = redis.createClient();
    },

    /**
     * 開始連線
     * @param {Object} callBackFun
     */
    startConnect(callBackFun) {
        console.log('Start Connect Redis');

        this.client.on('connect', () => {
            console.log('Redis client connected');

            callBackFun();
        });
    },

    /**
     * 取得連線物件
     */
    getRedisObject() {
        return this.client;
    },

    /**
     * 設定檔案
     * @param {Interger} key
     * @param {Json} data
     */
    setData(key, data) {
        this.client.set(key, data, redis.print);
    },

    /**
     * 取得資料
     * @param {Integer} key
     * @param {*} callBackFun
     */
    getData(key, callBackFun) {
        console.log(`Redis::getData Key: ${key}`);

        this.client.get(key, (error, result) => {
            if (error) {
                console.log(error);
                throw error;
            }

            console.log(`GET result ->${result}`);
            callBackFun(result);
        });
    },


};
