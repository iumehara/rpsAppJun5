const {Requests, Round} = require("../rps");

describe('play specs', () => {
    const repo = {
        save: () => {},
        history: () => {return []}
    };

    describe("win scenarios", () => {
        it('rock versus scissors', () => {
            const observer = jasmine.createSpyObj('observer', ['p1Wins']);

            new Requests().play('rock', 'scissors', observer, repo);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('scissors versus rock', () => {
            const observer = jasmine.createSpyObj('observer', ['p2Wins']);

            new Requests().play('scissors', 'rock', observer, repo);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('scissors vs. paper', () => {
            const observer = jasmine.createSpyObj('observer', ['p1Wins']);

            new Requests().play('scissors', 'paper', observer, repo);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('paper vs. scissors', () => {
            const observer = jasmine.createSpyObj('observer', ['p2Wins']);

            new Requests().play('paper', 'scissors', observer, repo);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('paper vs. rock', () => {
            const observer = jasmine.createSpyObj('observer', ['p1Wins']);

            new Requests().play('paper', 'rock', observer, repo);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('rock vs. paper', () => {
            const observer = jasmine.createSpyObj('observer', ['p2Wins']);

            new Requests().play('rock', 'paper', observer, repo);

            expect(observer.p2Wins).toHaveBeenCalled();
        });
    });


    describe("draw scenarios", () => {
        it('rock v.s. rock', () => {
            const observer = jasmine.createSpyObj('observer', ['tie']);

            new Requests().play('rock', 'rock', observer, repo);

            expect(observer.tie).toHaveBeenCalled();
        });

        it('scissors v.s. scissors', () => {
            const observer = jasmine.createSpyObj('observer', ['tie']);

            new Requests().play('scissors', 'scissors', observer, repo);

            expect(observer.tie).toHaveBeenCalled();
        });

        it('paper v.s. paper', () => {
            const observer = jasmine.createSpyObj('observer', ['tie']);

            new Requests().play('paper', 'paper', observer, repo);

            expect(observer.tie).toHaveBeenCalled();
        });
    });

    describe("invalid scenarios", () => {
        it('null v.s. null', () => {
            const observer = jasmine.createSpyObj('observer', ['invalid']);

            new Requests().play(null, null, observer, repo);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('invalid v.s. invalid', () => {
            const observer = jasmine.createSpyObj('observer', ['invalid']);

            new Requests().play('invalid', 'invalid', observer, repo);

            expect(observer.invalid).toHaveBeenCalled();
        });
    });

    describe("history", () => {
        it("does not call save when invalid", () => {
            const observer = {invalid: () => {}};
            const spyRepo = jasmine.createSpyObj('repo', ['save']);

            new Requests().play('invalid', 'invalid', observer, spyRepo);

            expect(spyRepo.save).not.toHaveBeenCalled();
        });

        it("calls save with throws when valid for player 1", () => {
            const observer = {p1Wins: () => {}};
            const spyRepo = jasmine.createSpyObj('repo', ['save']);

            new Requests().play('rock', 'scissors', observer, spyRepo);

            expect(spyRepo.save).toHaveBeenCalledWith(new Round('rock', 'scissors', 'p1wins'));
        });

        it("calls save with throws when valid for player 2", () => {
            const observer = {p2Wins: () => {}};
            const spyRepo = jasmine.createSpyObj('repo', ['save']);

            new Requests().play('scissors', 'rock', observer, spyRepo);

            expect(spyRepo.save).toHaveBeenCalledWith(new Round('scissors', 'rock', 'p2wins'));
        });

        it("calls save with throws when valid for a tie", () => {
            const observer = {tie: () => {}};
            const spyRepo = jasmine.createSpyObj('repo', ['save']);

            new Requests().play('rock', 'rock', observer, spyRepo);

            expect(spyRepo.save).toHaveBeenCalledWith(new Round('rock', 'rock', 'tie'));
        });
    })
});