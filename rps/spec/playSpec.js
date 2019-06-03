const {play} = require("../rps");

describe('play specs', () => {
    it('rock versus scissors', () => {
        expect(play('rock', 'scissors')).toBe('Player 1 Wins');
    })
});