import React from 'react'

export default class PlayForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: 'have not played yet :('
        }
    }

    playButtonClicked() {
        this.props.request.play(null, null, this)
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

    render() {
        return (
            <div>
                <div>Janken Game</div>
                <div>
                    <div>P1</div>
                </div>
                <div>
                    <div>P2</div>
                </div>
                <button onClick={this.playButtonClicked.bind(this)}>Play</button>
                <div>{this.state.result}</div>
            </div>
        )
    }
}