import React from 'react'
import {RESULT} from 'rps'

const MESSAGES = {
    [RESULT.P1WINS]: 'P1 Wins!',
    [RESULT.P2WINS]: 'P2 Wins!',
    [RESULT.DRAW]: 'Draw'
}

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

    rounds(rounds) {
        this.setState({rounds: rounds})
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
        const observer = this
        this.props.request.history(observer)
    }

    displayRounds() {
        const rounds = this.state.rounds
        if (rounds == null) {
            return null
        }

        if (rounds.length > 0) {
            return <table>
                <thead>
                <tr>
                    <th>P1</th>
                    <th>P2</th>
                    <th>Result</th>
                </tr>
                </thead>
                <body>
                {rounds.map(round =>
                    <tr>
                        <td>{round.p1}</td>
                        <td>{round.p2}</td>
                        <td>{MESSAGES[round.result]}</td>
                    </tr>
                )}
                </body>
            </table>
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
                <button name="history" onClick={this.historyButtonClicked.bind(this)}>Get History</button>
                {this.displayRounds()}
            </div>
        )
    }
}