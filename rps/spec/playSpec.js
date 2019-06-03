const {Requests} = require("../rps");

describe('play specs', () => {
    it('rock versus scissors', () => {
        const observer = jasmine.createSpyObj('observer', ['p1Wins']);

        expect(new Requests().play('rock', 'scissors', observer));

        expect(observer.p1Wins).toHaveBeenCalled();
    });

    it('scissors versus rock', () => {
        const observer = jasmine.createSpyObj('observer', ['p2Wins']);

        expect(new Requests().play('scissors', 'rock', observer));

        expect(observer.p2Wins).toHaveBeenCalled();
    });
});