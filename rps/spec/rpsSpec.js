const {Request} = require('../src/rps');

describe('rps logic', () => {
    describe('win', () => {
        it('rock vs. scissors', () => {
            let observer = jasmine.createSpyObj('observer', ['p1Wins'])

            new Request().play('rock', 'scissors', observer)

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('scissors vs. rock', () => {
            let observer = jasmine.createSpyObj('observer', ['p2Wins'])

            new Request().play('scissors', 'rock', observer)

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('rock vs. paper', () => {
            let observer = jasmine.createSpyObj('observer', ['p2Wins'])

            new Request().play('rock', 'paper', observer)

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('paper vs. rock', () => {
            let observer = jasmine.createSpyObj('observer', ['p1Wins'])

            new Request().play('paper', 'rock', observer)

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('paper vs. scissors', () => {
            let observer = jasmine.createSpyObj('observer', ['p2Wins'])

            new Request().play('paper', 'scissors', observer)

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('scissors vs. paper', () => {
            let observer = jasmine.createSpyObj('observer', ['p1Wins'])

            new Request().play('scissors', 'paper', observer)

            expect(observer.p1Wins).toHaveBeenCalled();
        });
    });

    describe('tie', () => {
        it('rock v.s. rock', () => {
            let observer = jasmine.createSpyObj('observer', ['tie'])

            new Request().play('rock', 'rock', observer)

            expect(observer.tie).toHaveBeenCalled();
        });

        it('scissors v.s. scissors', () => {
            let observer = jasmine.createSpyObj('observer', ['tie'])

            new Request().play('scissors', 'scissors', observer)

            expect(observer.tie).toHaveBeenCalled();
        });

        it('paper v.s. paper', () => {
            let observer = jasmine.createSpyObj('observer', ['tie'])

            new Request().play('paper', 'paper', observer)

            expect(observer.tie).toHaveBeenCalled();
        });
    });

    describe('invalid', () => {
        it('invalid v.s. invalid', () => {
            let observer = jasmine.createSpyObj('observer', ['invalid'])

            new Request().play('invalid', 'invalid', observer)

            expect(observer.invalid).toHaveBeenCalled();
        });
    });
});