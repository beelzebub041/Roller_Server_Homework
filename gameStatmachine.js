const StateMachine = require('javascript-state-machine');

module.exports = function FSM() {
    const fsm = new StateMachine({
        init: 'GameInit',
        transitions: [
            { name: 'Init', from: 'GameInit', to: 'GameWait' },
            { name: 'Spin', from: 'GameWait', to: 'GameSpin' },
            { name: 'WinScore', from: 'GameSPin', to: 'GameWin' },
            { name: 'NoWin', from: 'GameSPin', to: 'GameWait' },
            { name: 'End', from: 'GameWin', to: 'GameWait' },
        ],
        methods: {
            onInit() {
                console.log('I melted');
            },
            onSpin() {
                console.log('I froze');
            },
            onWinScore() {
                console.log('I vaporized');
            },
            onNoWin() {
                console.log('I condensed');
            },
            onEnd() {
                console.log('I condensed');
            },
        },
    });
};
