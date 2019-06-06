const THROWS = ['rock', 'paper', 'scissors'];

class Request {
    play(p1, p2, observer) {
        new PlayRequest(p1, p2, observer).process()
    }
}

class PlayRequest {
    constructor(p1, p2, observer) {
        this.p1 = p1
        this.p2 = p2
        this.observer = observer
    }

    process() {
        if (this.isInvalid()) {
            this.observer.invalid()
            return
        }

        if (this.p1 === this.p2) {
            this.observer.tie()
            return
        }

        if (this.p1 === 'rock' && this.p2 === 'scissors'
            || this.p1 === 'paper' && this.p2 === 'rock'
            || this.p1 === 'scissors' && this.p2 === 'paper') {
            this.observer.p1Wins()
            return
        }

        this.observer.p2Wins()
    }

    isInvalid() {
        return THROWS.includes(this.p1) === false ||
            THROWS.includes(this.p2) === false
    }
}

module.exports = {Request}