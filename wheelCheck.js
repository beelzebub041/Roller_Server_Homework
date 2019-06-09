module.exports = {

    arrBingoWheel: [],
    rowCount: 3,
    columnCount: 3,

    // 初始化
    init() {
        // 中獎盤面
        // this.arrBingoWheel = [
        //     [0, 1, 2],
        //     [0, 4, 8],
        //     [3, 4, 5],
        //     [6, 7, 8],
        //     [6, 4, 2],
        // ];

        this.arrBingoWheel = [
            [3, 4, 5],
            [3, 7, 11],
            [6, 7, 8],
            [9, 10, 11],
            [9, 7, 5],
        ];
    },

    // 是否中獎
    isWin(arrWheelInfo) {
        const arrReturn = [];

        for (let arrIdx = 0; arrIdx < this.arrBingoWheel.length; arrIdx++) {
            const BingoWheel = this.arrBingoWheel[arrIdx];

            console.log(`${arrWheelInfo[BingoWheel[0]]} ${arrWheelInfo[BingoWheel[1]]} ${arrWheelInfo[BingoWheel[2]]}`);

            if (arrWheelInfo[BingoWheel[0]] == arrWheelInfo[BingoWheel[1]] && arrWheelInfo[BingoWheel[1]] == arrWheelInfo[BingoWheel[2]]) {
                const WinInfo = {
                    WinScore: 200,
                    Line: BingoWheel,
                };

                arrReturn.push(WinInfo);
            }
        }

        return arrReturn;
    },

};
