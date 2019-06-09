

module.exports = {

    connection: null, // 連線物件

    rollerRow: 0, // 行數
    rollerColumn: 0, // 列數
    symbolCount: 0, // Symbol數量

    // 初始化
    init(connection) {
        this.connection = connection;
    },

    // 初始化機率
    initProb(rowCount, colCount, symbolCount) {
        console.log('Init Prob Info');

        this.rollerRow = rowCount;
        this.rollerColumn = colCount;
        this.symbolCount = symbolCount;
    },

    // 取得盤面資訊
    getWheelInfo() {
        const arrWheelInfo = [];

        let arrIdx = 0;

        for (let RowIdx = 0; RowIdx < this.rollerRow; RowIdx++) {
            for (let ColIdx = 0; ColIdx < this.rollerColumn; ColIdx++) {
                arrWheelInfo[arrIdx] = Math.floor(Math.random() * this.symbolCount);

                arrIdx++;
            }
        }

        console.log(`Get Wheel Info: ${arrWheelInfo}`);

        return arrWheelInfo;
    },


};
