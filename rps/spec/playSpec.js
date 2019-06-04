const {Requests} = require("../rps");

describe('play specs', () => {
    describe("win scenarios", () => {
        it('rock versus scissors', () => {
            const observer = jasmine.createSpyObj('observer', ['p1Wins']);

            new Requests().play('rock', 'scissors', observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('scissors versus rock', () => {
            const observer = jasmine.createSpyObj('observer', ['p2Wins']);

            new Requests().play('scissors', 'rock', observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('scissors vs. paper', () => {
            const observer = jasmine.createSpyObj('observer', ['p1Wins']);

            new Requests().play('scissors', 'paper', observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('paper vs. scissors', () => {
            const observer = jasmine.createSpyObj('observer', ['p2Wins']);

            new Requests().play('paper', 'scissors', observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('paper vs. rock', () => {
            const observer = jasmine.createSpyObj('observer', ['p1Wins']);

            new Requests().play('paper', 'rock', observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('rock vs. paper', () => {
            const observer = jasmine.createSpyObj('observer', ['p2Wins']);

            new Requests().play('rock', 'paper', observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });
    });


    describe("draw scenarios", () => {
        it('rock v.s. rock', () => {
            const observer = jasmine.createSpyObj('observer', ['tie']);

            new Requests().play('rock', 'rock', observer);

            expect(observer.tie).toHaveBeenCalled();
        });

        it('scissors v.s. scissors', () => {
            const observer = jasmine.createSpyObj('observer', ['tie']);

            new Requests().play('scissors', 'scissors', observer);

            expect(observer.tie).toHaveBeenCalled();
        });

        it('paper v.s. paper', () => {
            const observer = jasmine.createSpyObj('observer', ['tie']);

            new Requests().play('paper', 'paper', observer);

            expect(observer.tie).toHaveBeenCalled();
        });
    });

    describe("invalid scenarios", () => {
        it('null v.s. null', () => {
            const observer = jasmine.createSpyObj('observer', ['invalid']);

            new Requests().play(null, null, observer);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('invalid v.s. invalid', () => {
            const observer = jasmine.createSpyObj('observer', ['invalid']);

            new Requests().play('invalid', 'invalid', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });
    });
});