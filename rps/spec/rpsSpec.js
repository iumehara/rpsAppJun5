const {Request, Round} = require('../src/rps');

describe('rps logic', () => {
    const emptyRepo = {
        save: () => {}
    }

    describe("history", () => {
        it("sends no rounds to observer when emtpty", () => {
            let observer = jasmine.createSpyObj('observer', ['noRounds'])
            let repoSpy = {isEmpty: () => true}

            new Request(repoSpy).history(observer)

            expect(observer.noRounds).toHaveBeenCalled()
        });
    });

    describe("saving", () => {
        it("saves a round when p1 wins", () => {
            let observer = {p1Wins: () => {}}
            let repoSpy = jasmine.createSpyObj('repo', ['save'])

            new Request(repoSpy).play('rock', 'scissors', observer)

            expect(repoSpy.save).toHaveBeenCalledWith(new Round('rock', 'scissors', 'p1wins'))
        });

        it("saves a round when p2 wins", () => {
            let observer = {p2Wins: () => {}}
            let repoSpy = jasmine.createSpyObj('repo', ['save'])

            new Request(repoSpy).play('scissors', 'rock', observer)

            expect(repoSpy.save).toHaveBeenCalledWith(new Round('scissors', 'rock', 'p2wins'))
        });

        it("saves a round when draw wins", () => {
            let observer = {draw: () => {}}
            let repoSpy = jasmine.createSpyObj('repo', ['save'])

            new Request(repoSpy).play('rock', 'rock', observer)

            expect(repoSpy.save).toHaveBeenCalledWith(new Round('rock', 'rock', 'draw'))
        });

        it("saves a round when no game wins", () => {
            let observer = {noGame: () => {}}
            let repoSpy = jasmine.createSpyObj('repo', ['save'])

            new Request(repoSpy).play('sailboat', 'rock', observer)

            expect(repoSpy.save).toHaveBeenCalledWith(new Round('sailboat', 'rock', 'noGame'))
        });
    });

    describe('win', () => {
        it('rock vs. scissors', () => {
            let observer = jasmine.createSpyObj('observer', ['p1Wins'])

            new Request(emptyRepo).play('rock', 'scissors', observer)

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('scissors vs. rock', () => {
            let observer = jasmine.createSpyObj('observer', ['p2Wins'])

            new Request(emptyRepo).play('scissors', 'rock', observer)

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('rock vs. paper', () => {
            let observer = jasmine.createSpyObj('observer', ['p2Wins'])

            new Request(emptyRepo).play('rock', 'paper', observer)

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('paper vs. rock', () => {
            let observer = jasmine.createSpyObj('observer', ['p1Wins'])

            new Request(emptyRepo).play('paper', 'rock', observer)

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('paper vs. scissors', () => {
            let observer = jasmine.createSpyObj('observer', ['p2Wins'])

            new Request(emptyRepo).play('paper', 'scissors', observer)

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('scissors vs. paper', () => {
            let observer = jasmine.createSpyObj('observer', ['p1Wins'])

            new Request(emptyRepo).play('scissors', 'paper', observer)

            expect(observer.p1Wins).toHaveBeenCalled();
        });
    });

    describe('draw', () => {
        it('rock v.s. rock', () => {
            let observer = jasmine.createSpyObj('observer', ['draw'])

            new Request(emptyRepo).play('rock', 'rock', observer)

            expect(observer.draw).toHaveBeenCalled();
        });

        it('scissors v.s. scissors', () => {
            let observer = jasmine.createSpyObj('observer', ['draw'])

            new Request(emptyRepo).play('scissors', 'scissors', observer)

            expect(observer.draw).toHaveBeenCalled();
        });

        it('paper v.s. paper', () => {
            let observer = jasmine.createSpyObj('observer', ['draw'])

            new Request(emptyRepo).play('paper', 'paper', observer)

            expect(observer.draw).toHaveBeenCalled();
        });
    });

    describe('invalid', () => {
        it('invalid v.s. noGame', () => {
            let observer = jasmine.createSpyObj('observer', ['noGame'])

            new Request(emptyRepo).play('rock', 'cat', observer)

            expect(observer.noGame).toHaveBeenCalled();
        });
    });
});