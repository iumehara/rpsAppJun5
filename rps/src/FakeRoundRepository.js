class FakeRoundRepository {
    constructor() {
        this.rounds = []
    }

    isEmpty() {
        return this.rounds.length === 0
    }

    save(round) {
        this.rounds.push(round)
    }

    all() {
        return this.rounds
    }
}

module.exports = FakeRoundRepository;