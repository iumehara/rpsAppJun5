const FakeRoundRepository  = require('../src/FakeRoundRepository')
const {Round} = require('../src/rps')

describe('fake repo', () => {
    describe("when empty", () => {
        it("is empty is true", () => {
            const repo = new FakeRoundRepository();

            expect(repo.isEmpty()).toBe(true);
        })

        it("all rounds is empty", () => {
            const repo = new FakeRoundRepository();

            expect(repo.all()).toEqual([]);
        })
    })

    describe("when rounds available", () => {
        it("is empty is false", () => {
            const repo = new FakeRoundRepository();

            repo.save(new Round('rock', 'paper', 'p2wins'))

            expect(repo.isEmpty()).toBe(false);
        })

        it("when rounds, all returns rounds", () => {
            const repo = new FakeRoundRepository();
            const round = new Round('rock', 'paper', 'p2wins')

            repo.save(round)

            expect(repo.all()).toEqual([round]);
        })

        it("returns copy of rounds", () => {
            const repo = new FakeRoundRepository();
            const round = new Round('rock', 'paper', 'p2wins')

            repo.save(round)

            const result = repo.all()
            expect(result).toEqual([round]);
            result.push(round)
            expect(repo.all()).toEqual([round]);
        })
    })
});