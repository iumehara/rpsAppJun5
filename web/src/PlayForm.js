import React from 'react'

export default class PlayForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: 'have not played yet :(',
            rounds: null
        }
    }

    p1Wins() {
        this.setState({result: 'P1 Wins!'})
    }

    p2Wins() {
        this.setState({result: 'P2 Wins!'})
    }

    noGame() {
        this.setState({result: 'No Game'})
    }

    draw() {
        this.setState({result: 'Draw'})
    }

    noRounds() {
        this.setState({rounds: []})
    }

    inputChanged(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    playButtonClicked() {
        const p1Hand = this.state.p1Hand
        const p2Hand = this.state.p2Hand
        const observer = this
        this.props.request.play(p1Hand, p2Hand, observer)
    }

    historyButtonClicked() {
        this.props.request.history(this)
    }

    displayRounds() {
        if (this.state.rounds == null) {
            return null
        }

        return <p>No Rounds</p>
    }

    render() {
        return (
            <div>
                <div>Janken Game</div>
                <div>
                    <div>P1</div>
                    <input name='p1Hand'
                           onChange={this.inputChanged.bind(this)}/>
                </div>
                <div>
                    <div>P2</div>
                    <input name='p2Hand'
                        onChange={this.inputChanged.bind(this)}/>
                </div>
                <button name="play" onClick={this.playButtonClicked.bind(this)}>Play</button>
                <div>{this.state.result}</div>
                <h2>History</h2>
                <button name="history" onClick={this.historyButtonClicked.bind(this)}>History</button>
                { this.displayRounds() }
            </div>
        )
    }
}