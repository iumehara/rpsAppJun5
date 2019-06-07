const {Request, Round} = require('../src/rps');

describe('rps logic', () => {
    const emptyRepo = {
        save: () => {}
    }

    describe("saving", () => {
        it("saves a round when p1 wins", () => {
            let observer = {p1Wins: () => {}}
            let repoSpy = jasmine.createSpyObj('repo', ['save'])

            new Request().play('rock', 'scissors', observer, repoSpy)

            expect(repoSpy.save).toHaveBeenCalledWith(new Round('rock', 'scissors', 'p1wins'))
        });

        it("saves a round when p2 wins", () => {
            let observer = {p2Wins: () => {}}
            let repoSpy = jasmine.createSpyObj('repo', ['save'])

            new Request().play('scissors', 'rock', observer, repoSpy)

            expect(repoSpy.save).toHaveBeenCalledWith(new Round('scissors', 'rock', 'p2wins'))
        });

        it("saves a round when draw wins", () => {
            let observer = {draw: () => {}}
            let repoSpy = jasmine.createSpyObj('repo', ['save'])

            new Request().play('rock', 'rock', observer, repoSpy)

            expect(repoSpy.save).toHaveBeenCalledWith(new Round('rock', 'rock', 'draw'))
        });

        it("saves a round when no game wins", () => {
            let observer = {noGame: () => {}}
            let repoSpy = jasmine.createSpyObj('repo', ['save'])

            new Request().play('sailboat', 'rock', observer, repoSpy)

            expect(repoSpy.save).toHaveBeenCalledWith(new Round('sailboat', 'rock', 'noGame'))
        });
    });

    describe('win', () => {
        it('rock vs. scissors', () => {
            let observer = jasmine.createSpyObj('observer', ['p1Wins'])

            new Request().play('rock', 'scissors', observer, emptyRepo)

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('scissors vs. rock', () => {
            let observer = jasmine.createSpyObj('observer', ['p2Wins'])

            new Request().play('scissors', 'rock', observer, emptyRepo)

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('rock vs. paper', () => {
            let observer = jasmine.createSpyObj('observer', ['p2Wins'])

            new Request().play('rock', 'paper', observer, emptyRepo)

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('paper vs. rock', () => {
            let observer = jasmine.createSpyObj('observer', ['p1Wins'])

            new Request().play('paper', 'rock', observer, emptyRepo)

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('paper vs. scissors', () => {
            let observer = jasmine.createSpyObj('observer', ['p2Wins'])

            new Request().play('paper', 'scissors', observer, emptyRepo)

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('scissors vs. paper', () => {
            let observer = jasmine.createSpyObj('observer', ['p1Wins'])

            new Request().play('scissors', 'paper', observer, emptyRepo)

            expect(observer.p1Wins).toHaveBeenCalled();
        });
    });

    describe('draw', () => {
        it('rock v.s. rock', () => {
            let observer = jasmine.createSpyObj('observer', ['draw'])

            new Request().play('rock', 'rock', observer, emptyRepo)

            expect(observer.draw).toHaveBeenCalled();
        });

        it('scissors v.s. scissors', () => {
            let observer = jasmine.createSpyObj('observer', ['draw'])

            new Request().play('scissors', 'scissors', observer, emptyRepo)

            expect(observer.draw).toHaveBeenCalled();
        });

        it('paper v.s. paper', () => {
            let observer = jasmine.createSpyObj('observer', ['draw'])

            new Request().play('paper', 'paper', observer, emptyRepo)

            expect(observer.draw).toHaveBeenCalled();
        });
    });

    describe('invalid', () => {
        it('invalid v.s. noGame', () => {
            let observer = jasmine.createSpyObj('observer', ['noGame'])

            new Request().play('rock', 'cat', observer, emptyRepo)

            expect(observer.noGame).toHaveBeenCalled();
        });
    });
});