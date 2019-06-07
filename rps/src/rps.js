const THROW = {
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSORS: 'scissors'
}

const THROWS = [THROW.ROCK, THROW.PAPER, THROW.SCISSORS];

const RESULT = {
    P1WINS: 'p1wins',
    P2WINS: 'p2wins',
    DRAW: 'draw',
}

class Request {
    play(p1, p2, observer, repo) {
        new PlayRequest(p1, p2, observer, repo).process()
    }
}

class PlayRequest {
    constructor(p1, p2, observer, repo) {
        this.p1 = p1
        this.p2 = p2
        this.observer = observer
        this.repo = repo
    }

    process() {
        if (this.noGame()) {
            this.observer.noGame()
            return
        }

        if (this.isDraw()) {
            this.observer.draw()
            this.repo.save(new Round(this.p1, this.p2, RESULT.DRAW))
            return
        }

        if (this.p1Wins()) {
            this.repo.save(new Round(this.p1, this.p2, RESULT.P1WINS))
            this.observer.p1Wins()
            return
        }

        this.repo.save(new Round(this.p1, this.p2, RESULT.P2WINS))
        this.observer.p2Wins()
    }

    p1Wins() {
        return this.p1 === THROW.ROCK && this.p2 === THROW.SCISSORS
            || this.p1 === THROW.PAPER && this.p2 === THROW.ROCK
            || this.p1 === THROW.SCISSORS && this.p2 === THROW.PAPER
    }

    isDraw() {
        return this.p1 === this.p2
    }

    noGame() {
        return THROWS.includes(this.p1) === false ||
            THROWS.includes(this.p2) === false
    }
}

class Round {
    constructor(p1, p2, result) {
        this.p1 = p1
        this.p2 = p2
        this.result = result
    }
}

module.exports = {Request, Round}