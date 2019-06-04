const THROW = {
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSORS: 'scissors'
};

const VALID_MOVES = [THROW.ROCK, THROW.PAPER, THROW.SCISSORS];

function Requests() {
    this.play = (p1, p2, observer) => {
        new PlayRoundRequest(p1, p2, observer).process();
    }
}

function PlayRoundRequest(p1, p2, observer) {
    this.process = () => {
        if (invalid(p1) || invalid(p2)) {
            return
        }

        if (draw()) {
            observer.tie();
            return
        }

        if (p1Wins()) {
            observer.p1Wins()
        } else {
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

module.exports = {Requests};