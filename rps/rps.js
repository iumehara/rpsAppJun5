const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';
const VALID_MOVES = ['rock', 'paper', 'scissors'];

class Requests {
    play(p1, p2, observer) {
        new PlayRoundRequest(p1, p2, observer).process();
    }
}

function PlayRoundRequest(p1, p2, observer) {
    this.process = () => {
        if (VALID_MOVES.includes(p1) === false || VALID_MOVES.includes(p2) === false) {
            return;
        }

        if (p1 === p2) {
            observer.tie();
            return;
        }

        if (p1 === ROCK && p2 === SCISSORS
            || p1 === SCISSORS && p2 === PAPER
            || p1 === PAPER && p2 === ROCK) {
            observer.p1Wins();
        } else {
            observer.p2Wins();
        }
    }
}

module.exports = {Requests};