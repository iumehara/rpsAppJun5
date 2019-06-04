const THROW = {
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSORS: 'scissors'
};

const RESULT = {
    P1WINS: 'p1wins',
    P2WINS: 'p2wins',
    TIE: 'tie'
};

const VALID_MOVES = [THROW.ROCK, THROW.PAPER, THROW.SCISSORS];

class Round {
    constructor(p1, p2, result) {
        this.p1 = p1;
        this.p2 = p2;
        this.result = result;
    }
}

function Requests() {
    this.play = (p1, p2, observer, repo) => {
        new PlayRoundRequest(p1, p2, observer, repo).process();
    }
}

function PlayRoundRequest(p1, p2, observer, repo) {
    this.process = () => {
        if (invalid(p1) || invalid(p2)) {
            observer.invalid();
            return
        }

        if (draw()) {
            repo.save(new Round(p1, p2, RESULT.TIE));
            observer.tie();
            return
        }

        if (p1Wins()) {
            repo.save(new Round(p1, p2, RESULT.P1WINS));
            observer.p1Wins()
        } else {
            repo.save(new Round(p1, p2, RESULT.P2WINS));
            observer.p2Wins()
        }
    };

    const invalid = (choice) => {
        return VALID_MOVES.includes(choice) === false
    };

    const draw = () => {
        return p1 === p2
    };

    const p1Wins = () => {
        return p1 === THROW.ROCK && p2 === THROW.SCISSORS
            || p1 === THROW.SCISSORS && p2 === THROW.PAPER
            || p1 === THROW.PAPER && p2 === THROW.ROCK;
    }
}

module.exports = {Requests, Round};