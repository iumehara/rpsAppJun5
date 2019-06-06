const THROWS = ['rock', 'paper', 'scissors'];

class Request {
    play(p1, p2, observer) {
        if (THROWS.includes(p1) === false ||
            THROWS.includes(p2) === false) {
            observer.invalid()
            return
        }

        if (p1 === p2) {
            observer.tie()
            return
        }

        if (p1 === 'rock' && p2 === 'scissors'
            || p1 === 'paper' && p2 === 'rock'
            || p1 === 'scissors' && p2 === 'paper') {
            observer.p1Wins()
            return
        }

        observer.p2Wins()
    }
}

module.exports = {Request}