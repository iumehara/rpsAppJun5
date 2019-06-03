class Requests {
    play(p1, p2, observer) {
        if (p2 === 'rock') {
            observer.p2Wins();
        } else {
            observer.p1Wins();
        }
    }
}

module.exports = {Requests};