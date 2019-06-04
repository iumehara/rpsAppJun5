class Requests {
    play(p1, p2, observer) {
        new PlayRoundRequest(p1, p2, observer).process();
    }
}

function PlayRoundRequest(p1, p2, observer) {
    this.process = () => {
        if (['rock', 'paper', 'scissors'].includes(p1) === false
            || ['rock', 'paper', 'scissors'].includes(p2) === false) {
            return;
        }

        if (p1 === p2) {
            observer.tie();
            return;
        }

        if (p1 === 'rock' && p2 === 'scissors'
            || p1 === 'scissors' && p2 === 'paper'
            || p1 === 'paper' && p2 === 'rock') {
            observer.p1Wins();
        } else {
            observer.p2Wins();
        }
    }
}

module.exports = {Requests};